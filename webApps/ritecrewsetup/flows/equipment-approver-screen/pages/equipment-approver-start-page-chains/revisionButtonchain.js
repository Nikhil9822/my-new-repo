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

  class revisionButtonchain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05ProjectCosts2',
        uriParams: {
          q: "UserExpenditureBatch="+current.row.expenditure_batch,
        },
      });

      if (response.body.items.length>=1) {

        const response2 = await Actions.callRest(context, {
          endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05ProjectCostsTranscationNumberActionAdjustProjectCosts',
          uriParams: {
            transcationNumber: response.body.items[0].TransactionNumber,
          },
          body: {
            AdjustmentType: 'REVERSE',
            Justification: 'Reverse due to incorrect entry',
          },
        });

        if (response2.ok) {
          const revisionpayload = await $functions.revisionpayload($variables.rowData, current.row);
          console.log("###################",$variables.rowData)
          
          const response3 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/postFscmRestApiResources11_13_18_05UnprocessedProjectCosts',
            body: revisionpayload,
          });

          if (response3.ok) {

            const response4 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/putEQPRite_TimeEntryRevisionSearch',
              uriParams: {
                'p_expenditure_batch': response3.body.ExpenditureBatch,
                'p_quantity': response3.body.Quantity,
                'p_batch_id': current.row.batch_id,
              },
            });

            const response5 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/getEQPRite_TimeEntryRevisionSearch',
              uriParams: {
                'p_batch_id': current.row.batch_id,
              },
            });

            await Actions.resetVariables(context, {
              variables: [
    '$variables.revisionAdp.data',
  ],
            });

            $variables.revisionAdp.data = response5.body.items;

            const loadingDialogClose4 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              type: 'confirmation',
              displayMode: 'transient',
              summary: 'Project Cost Adjusted',
            });
          }else{
            const loadingDialogClose5 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Adjust Project Cost',
              type: 'error',
              displayMode: 'transient',
            });
            
          }

        }else{
          const loadingDialogClose3 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Adjust Project Cost',
            type: 'error',
            displayMode: 'transient',
            message: response2.body,
          });
          
        }
      }else{
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Fetch Project Cost Details',
          type: 'error',
          displayMode: 'transient',
        });
        
      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return revisionButtonchain;
});
