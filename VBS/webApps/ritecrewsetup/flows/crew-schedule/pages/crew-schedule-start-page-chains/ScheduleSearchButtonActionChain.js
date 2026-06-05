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

  class ScheduleSearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.scheduleMainADP.data',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpSchEquipmentSearch',
        uriParams: {
          'p_asset_group': $page.variables.assetgroup||"",
          'p_equipment_resource_class': $page.variables.selectedEquipmentClass ? $page.variables.selectedEquipmentClass : '',
          'p_requestor_name': $page.variables.requestor_name ? $page.variables.requestor_name : '',
          'p_project_id': $variables.selectedParams.project_id||"",
        },
      });

      if (response.ok) {

        if (response.body.items.length>0) {
           $variables.scheduleMainADP.data = response.body.items;

          await $functions.alterResp(response.body.items);

        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data Found',
            type: 'info',
            displayMode: 'transient',
          });
        }

       
        
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch data',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return ScheduleSearchButtonActionChain;
});
