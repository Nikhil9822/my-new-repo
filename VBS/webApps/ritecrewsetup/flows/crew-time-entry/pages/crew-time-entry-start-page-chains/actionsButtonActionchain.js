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

  class actionsButtonActionchain extends ActionChain {

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

      $variables.selectedRowdata = current.row;

      const actionspopupOpen = await Actions.callComponentMethod(context, {
        selector: '#actionspopup',
        method: 'open',
      });

      // const response = await Actions.callRest(context, {
      //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_CONTRACT_NONLABOR_DETAILS1_0GetNlrValues',
      //   uriParams: {
      //     'p_project_id': current.row.project_id,
      //   },
      // });

      

      // const response2 = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/getEQPRite_MasterNonLaborDetails',
      //   uriParams: {
      //     'p_equipment_id': current.row.equipment_id,
      //   },
      // });

      // const matchedOicRecordsByName = await $functions.getMatchedOicRecordsByName(response.body.items, response2.body.items);

      // $variables.nonlaborResourceAdp.data = matchedOicRecordsByName;
    }
  }

  return actionsButtonActionchain;
});
