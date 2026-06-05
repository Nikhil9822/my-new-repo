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

  class fetchEquipments extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions, $co } = context;
// debugger;
      if (true) {

        const loadOpen = await Actions.callComponentMethod(context, {
          selector: '#load',
          method: 'open',
        });

        const response2 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
          headers: {
            'p_equipment_resource_class': $variables.searchVar ? $variables.searchVar : "",
            'p_end_date': $variables.enddate ? $functions.formatDate($variables.enddate) : "",
            'p_start_date': $variables.startdate ? $functions.formatDate($variables.startdate) : "",
          },
          uriParams: {
            'p_equipment_resource_class': $variables.searchVar ?$variables.searchVar:'',
            'p_end_date': $variables.enddate ? $functions.formatDate($variables.enddate) : "",
            'p_start_date': $variables.startdate ? $functions.formatDate($variables.startdate) : "",
            'p_asset_group': $variables.assetgroup||"",
            'p_equipment_name': $variables.eqpName||"",
          },
        });

        if (response.ok) {
          if (response.body.items.length > 0) {
            const uniqRecords = await $functions.getUniqueEquipments(response.body.items, response2.body.items);

            $variables.equipmentADP.data = uniqRecords;
          } else {

            await Actions.resetVariables(context, {
              variables: [
    '$variables.equipmentADP.data',
  ],
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'No Equipment Available for Selected Parameters',
              displayMode: 'transient',
              type: 'info',
            });

          }
          const loadClose2 = await Actions.callComponentMethod(context, {
            selector: '#load',
            method: 'close',
          });
        } else {

          const loadClose3 = await Actions.callComponentMethod(context, {
            selector: '#load',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Fetch Equipment Details',
            displayMode: 'transient',
          });
        }
      }else{
        const loadClose = await Actions.callComponentMethod(context, {
          selector: '#load',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Equipment Class',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return fetchEquipments;
});
