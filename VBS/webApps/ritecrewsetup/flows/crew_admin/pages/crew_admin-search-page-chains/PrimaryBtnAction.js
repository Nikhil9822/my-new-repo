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

  class PrimaryBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions, $co, $eq } = context;

      if ($variables.pagetype === "Create") {
        const toCrewAdmin = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'crew_admin',
          page: 'crew_admin-add-new-screen',
        });

      } else if ($variables.pagetype === "Save") {
        let responseVar;

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });
        const updatepayload = await $functions.updatepayload($variables.RowData, $application.variables.user);
        // debugger;
        if ($variables.selectedResourceArray) {

          const convertSetToArray = await $functions.convertSetToArray($variables.selectedResourceArray);

          const results = await ActionUtils.forEach(convertSetToArray, async (item, index) => {

            const response3 = await Actions.callRest(context, {
              endpoint: 'getContractSummary/getEQUIPMENT_RITENLR_LOV1_0GetNlrValues2',
              uriParams: {
                name: item,
              },
            });

            if (response3.ok) {
              updatepayload.p_non_labor_resource = response3.body.items[0].name;
              updatepayload.p_non_labor_resource_org = response3.body.items[0].organization;
              updatepayload.p_expenditure_type_name = response3.body.items[0].expendituretypename;
              updatepayload.p_expenditure_type_id = response3.body.items[0].expendituretypeid;
              updatepayload.p_contract_type = response3.body.items[0].contract_type ? response3.body.items[0].contract_type : "";
              updatepayload.p_contract_number = response3.body.items[0].contract_number ? response3.body.items[0].contract_number : "";
              updatepayload.p_contract_id = response3.body.items[0].contract_id ? response3.body.items[0].contract_id : "";
              updatepayload.p_update_type = "EQP_NONLABOR";

              const response2 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/putGetEquipmentMasterDetail',
                uriParams: {
                  'p_equipment_id': $variables.RowData.equipment_id,
                },
                body: updatepayload,
              });

              responseVar = response2;
            }
          }, { mode: 'serial' });

          if (responseVar.ok) {

            const loadingDialogClose = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
            await Actions.fireNotificationEvent(context, {
              summary: 'Equipment Master Details Updated',
              type: 'confirmation',
              displayMode: 'transient',
            });

            await Actions.navigateBack(context, {
            });

          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Update Master Data',
              type: 'error',
              displayMode: 'transient',
            });

          }
        }
        else {
          updatepayload.p_non_labor_resource = null;
          updatepayload.p_non_labor_resource_org = null;
          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putGetEquipmentMasterDetail',
            body: updatepayload,
            uriParams: {
              'p_equipment_id': $variables.RowData.equipment_id,
            },
          });

          if (response.ok) {
            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Equipment Master Details Updated',
              displayMode: 'transient',
              type: 'confirmation',
            });

            await Actions.navigateBack(context, {
            });
          }
          else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To Update Equipment Master Data',
              type: 'error',
              displayMode: 'transient',
            });

          }
        }





      } else {
        const toEquipmentRequisition = await Actions.navigateToFlow(context, {
          target: 'parent',
          flow: 'equipment-requisition',
          page: 'equipment-requisition-start',
        });
      }

    }
  }

  return PrimaryBtnAction;
});
