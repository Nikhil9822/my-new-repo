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

  class spanClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.data
     */
    async run(context, { event, data }) {
      const { $page, $flow, $application, $constants, $variables ,$functions} = context;
       const loadOpen = await Actions.callComponentMethod(context, {
        selector: '#load',
        method: 'open',
      });

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
        uriParams: {
          'p_equipment_resource_class': data.leaf ? data.parentKey : data.key,
          'p_equipment_sub_class': data.leaf ? data.key:"",
          'p_end_date': '',
          'p_equipment_name': '',
          'p_start_date': '',
          'p_asset_group': $variables.assetgroup||"",
        },
      });

      const response3 = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_NONLABORRESOURCERATESOIC1_0GetNonLaborResourceRates',
      });

      if (response2.ok) {
        const uniqueEquipments = await $functions.getUniqueEquipments(response2.body.items,response3.body.items);

        $variables.equipmentADP.data = uniqueEquipments;
        
      }

      const loadClose = await Actions.callComponentMethod(context, {
        selector: '#load',
        method: 'close',
      });
    }
  }

  return spanClickChain;
});
