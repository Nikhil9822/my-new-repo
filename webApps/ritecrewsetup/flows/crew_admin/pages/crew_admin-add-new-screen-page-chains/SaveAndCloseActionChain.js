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

  class SaveAndCloseActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables, $functions } = context;

      // if ($variables.assetobj.default_loc) {

      if (true) {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response4 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
        });

        const callFunctionResult = await $page.functions.createPayloadMasterTab($page.variables.MasterTabObj, $page.variables.AssetsTabObj, $page.variables.ManufacturerTabObj, $page.variables.LocationTabObj, $page.variables.LeasingTabObj, $page.variables.CostingTabObj, $page.variables.fileObj, $variables.selectednonlabourResourceorg, $variables.assetobj, $variables.dummyMainanenencaName, response4.body.items);
        if (callFunctionResult !== undefined || callFunctionResult !== "") {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postGetEquipmentMasterDetail',
            body: callFunctionResult,
            contentType: 'application/json',
          });
let payload={
  "dummy" : ""
};
          const response7 = await Actions.callRest(context, {
            endpoint: 'getContractSummary/postEQUIPMENT_RITEEQP_FA_COSTDETAILS1_0InsertDataintoDB',
            uriParams: {
              'p_maintenance_asset_number':$variables.dummyMainanenencaName,
            },
            body: payload,
          });

          const response8 = await Actions.callRest(context, {
            endpoint: 'getContractSummary/postEQUIPMENT_RITEEQP_MAINTENANCECOSTDETAILS1_0MaintcostdetailsintoDB',
            uriParams: {
              'p_asset_number': $variables.dummyMainanenencaName,
            },
            body: payload,
          });
          if (response.ok) {

            if ($variables.selectednonlabourResource) {
// debugger;
              const results2 = await ActionUtils.forEach($variables.selectednonlabourResource, async (item, index) => {
                callFunctionResult.p_expendituretypename = item.expendituretypename||"";
                callFunctionResult.p_expendituretypeid = item.expendituretypeid||"";
                callFunctionResult.p_non_labor_resource = item.name;
                callFunctionResult.p_non_labor_resource_org = item.organization;
                callFunctionResult.p_contract_type = item.contract_type ? item.contract_type :"";
                callFunctionResult.p_contract_number = item.contract_number ? item.contract_number: "";
                callFunctionResult.p_contract_id = item.contract_id ? item.contract_id:"";
                callFunctionResult.p_equipment_id = response.body.equipment_id;

                const response5 = await Actions.callRest(context, {
                  endpoint: 'TimeRite_Ords_Service/postEQPRite_MasterLines',
                  body: callFunctionResult,
                });
              }, { mode: 'serial' });
            }

            // const response6 = await Actions.callRest(context, {
            //   endpoint: 'TimeRite_Ords_Service/postEQPRite_MasterLines',
            //   body: callFunctionResult,
            // });

            if ($page.variables.AssetsTabObj.assetNumber) {

              const response2 = await Actions.callRest(context, {
                endpoint: 'projectNameList/MaintenanceForecasts',
                uriParams: {
                  q: "AssetNumber='" + $variables.AssetsTabObj.assetNumber + "'",
                },
              });

              if (response2.body.items.length > 0) {
                const results = await ActionUtils.forEach(response2.body.items, async (item, index) => {

                  const maintenancePaylodGenerator = await $functions.maintenancePaylodGenerator(response2.body.items[index], undefined, $variables.MasterTabObj.equipment_Name, $variables.MasterTabObj.equipment_Class, $variables.MasterTabObj.status, $application.user.email);

                  const response3 = await Actions.callRest(context, {
                    endpoint: 'TimeRite_Ords_Service/EqpMasterWorkOrder',
                    body: maintenancePaylodGenerator,
                  });
                }, { mode: 'serial' });

              }

            }

            await Actions.fireNotificationEvent(context, {
              summary: 'Equipment saved successfully',
              type: 'confirmation',
              displayMode: 'transient',
            });

            const loadingDialogClose = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.navigateBack(context, {
            });


          }
          else {

            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Error occurred while saving Equipment',
              type: 'error',
            });

          }
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Default Asset Location',
          type: 'error',
          displayMode: 'transient',
        });

      }

    }
  }

  return SaveAndCloseActionChain;
});
