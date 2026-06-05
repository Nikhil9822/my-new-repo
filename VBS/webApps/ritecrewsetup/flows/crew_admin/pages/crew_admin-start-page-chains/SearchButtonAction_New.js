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

  class SearchButtonAction_New extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.assetgroup ) {
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getEquipmentMaster',
          uriParams: {
            'p_asset_group': $variables.assetgroup || "",
            'p_eqp_class': $variables.eqpClass || "",
            'p_asset_org': $variables.assetOrg||"",
            'p_maintenance_asset_number': $variables.asset||"",
            'p_equipment_name': $variables.masterSearchObj.equipmentNameVal||"",
          },
        });

        if (response.ok) {


          if (response.body.items.length>0) {
            

            $variables.equipmentMasterTable.data = response.body.items;

            const loadingDialogClose = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
          }else{
            const loadingDialogClose3 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'No Data Found',
              displayMode: 'transient',
              type: 'info',
            });
            
          }
        }else{
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Fetch Master Data',
            type: 'error',
            displayMode: 'transient',
          });
          
        }
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Asset Group',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return SearchButtonAction_New;
});
