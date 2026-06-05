define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class approveButtonActionChain extends ActionChain {
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const checkStatus = await $functions.checkStatus($variables.FilteredData);
      
const result = ($variables.FilteredData || [])
        .map(r =>
          Array.isArray(r.status)
            ? ({ ...r, status: r.status.filter(s => s === 'ERROR' || s === 'SUBMITTED') })
            : ((r.status === 'ERROR' || r.status === 'SUBMITTED') ? r : null)
        )
        .filter(Boolean)
        .filter(r => Array.isArray(r.status) ? r.status.length : true)


      if (checkStatus) {

        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        try {
          await ActionUtils.forEach(result, async (item, index) => {
            if (!item.project_id) return;

           
            // await $page.functions.bu();

            const response = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05ProjectsProjectId',
              uriParams: { ProjectId: item.project_id },
            });

            const lookupsResp = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05GenericLookupsEQP_PRJ_ORGANIZATION',
            });

            const orgName = response?.body?.OwningOrganizationName;
            const lookupCodes = lookupsResp?.body?.items?.[0]?.lookupCodes || [];
            const hasMatch = lookupCodes.some(lc => lc?.Description === orgName);

            if (!hasMatch) {
              
              const createApproveReq = await $functions.createApproveReq(item);
              await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/putEqpSubmitTimeEntry',
                body: createApproveReq,
              });
              return;
            }


            const buildEquipmentPayloadArray = await $functions.buildEquipmentPayloadArray(item);

           
            let successCount = 0;
            let duplicateCount = 0;   
            let otherErrorCount = 0;  

            await ActionUtils.forEach(buildEquipmentPayloadArray, async (item1, index1) => {
              const response2 = await Actions.callRest(context, {
                endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05UnprocessedProjectCosts',
                body: item1,
              });

              if (response2.ok) {
                
                const postsuccessDetails = await $functions.postsuccessDetails(response2.body, item, $application.user.username  || $application.variables.user);

                const response3 = await Actions.callRest(context, {
                  endpoint: 'TimeRite_Ords_Service/postEQPRite_TimeEntryLines',
                  body: postsuccessDetails,
                });

                successCount++;
                return;
              }

              
              const extracted = await $functions.extractOracleErrorMessages(response2.body);

              const isDuplicateError =
                Array.isArray(extracted)
                  ? extracted.some(msg => typeof msg === 'string' && /transaction.*already\s+exists/i.test(msg))
                  : (typeof extracted === 'string' && /transaction.*already\s+exists/i.test(extracted));

              if (isDuplicateError) {
                duplicateCount++;
              } else {
                otherErrorCount++;
              }

            
              const postErrorCode = await $functions.postErrorCode(
                extracted,
                $application.variables.user || $application.user.username || '',
                item,
                item1
              );
              await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/postEQPRite_ErrorDetails',
                body: postErrorCode,
              });
            }, { mode: 'serial' });

          
            const total = buildEquipmentPayloadArray.length;
            const allGoodOrDuplicate = (successCount + duplicateCount === total) && (otherErrorCount === 0);

            if (allGoodOrDuplicate) {
          
              const approveReq = await $functions.createApproveReq(item);
              await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/putEqpSubmitTimeEntry',
                body: approveReq,
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'Transactions submitted successfully',
                type: 'confirmation',
                displayMode: 'transient',
              });
            } else {
              
              const postError = await $functions.postError(item);
              await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/putEqpSubmitTimeEntry',
                body: postError,
              });

            
              await Actions.fireNotificationEvent(context, {
                summary: 'The submitted transactions were unsuccessful',
                type: 'error',
                displayMode: 'transient',
              });
            }
          }, { mode: 'serial' });
        } finally {
          await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.callChain(context, {
            chain: 'SearchButtonActionChain_New',
          });
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Records With Submitted Status',
          type: 'error',
          displayMode: 'transient',
        });
      }
    }
  }

  return approveButtonActionChain;
});
