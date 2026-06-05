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

  class updateTimesheetButtonActionChainNew extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $eq, $co } = context;

      const validateGroup = await $application.functions.validateGroup('updateSearchformvalidation');

      if (validateGroup === "valid") {
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        // const response1 = await Actions.callRest(context, {
        //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
        // });
        const response3 = await Actions.callRest(context, {
          endpoint: 'getContractSummary/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
          uriParams: {
            'non_labor_resource_name': $variables.projectBasedRowData.non_labor_resource,
          },
        });
// debugger;
        if (response3.body.count>0) {


          // const result = response3.body.items || [];
          // const match = result.find(rate => rate.non_labor_resource_name === $variables.projectBasedRowData.non_labor_resource);

          if ($variables.projectBasedRowData.non_labor_resource === response3.body.items[0].non_labor_resource_name) {
          // }
          // if (match) {

            $variables.projectBasedRowData.p_nonlabor_resource_rate_unit = response3.body.items[0].rate_unit;

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/putEquipAssignmentData',
              body: $variables.projectBasedRowData,
            });

            if (response.ok) {
              const loadingDialogClose = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.resetVariables(context, {
                variables: [
    '$variables.selectedKey',
  ],
              });

              await Actions.callChain(context, {
                chain: 'SearchButtonAction_New',
              });

              const timesDialogClose = await Actions.callComponentMethod(context, {
                selector: '#timesDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'TimeSheet updated Successfully',
                type: 'confirmation',
                displayMode: 'transient',
              });
            } else {
              const loadingDialogClose2 = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'Failed To Update Timesheet',
                type: 'error',
                displayMode: 'transient',
              });

            }
          }
        }else{
          

          $variables.projectBasedRowData.p_nonlabor_resource_rate_unit = "DY";

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putEquipAssignmentData',
            body: $variables.projectBasedRowData,
          });

          if (response2.ok) {
            const loadingDialogClose = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
          
            await Actions.resetVariables(context, {
              variables: [
              '$variables.selectedKey',
            ],
            });
          
            await Actions.callChain(context, {
              chain: 'SearchButtonAction_New',
            });
          
            const timesDialogClose = await Actions.callComponentMethod(context, {
              selector: '#timesDialog',
              method: 'close',
            });
          
            await Actions.fireNotificationEvent(context, {
              summary: 'TimeSheet updated Successfully',
              type: 'confirmation',
              displayMode: 'transient',
            });
          } else {
            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
          
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Update Timesheet',
              type: 'error',
              displayMode: 'transient',
            });
          
          }
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Fill All Required Fields Before Update',
          type: 'error',
          displayMode: 'transient',
        });

      }
    }
  }

  return updateTimesheetButtonActionChainNew;
});
