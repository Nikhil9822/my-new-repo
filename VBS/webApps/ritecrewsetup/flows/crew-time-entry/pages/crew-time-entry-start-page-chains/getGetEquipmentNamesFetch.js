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

  class getGetEquipmentNamesFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_ClassEqpNames',
        uriParams: {
          'p_equipment_class': $variables.searchobj.eqClass,
          'page_name': $application.currentPage.id,
        },
      });

      return callRestEndpoint1;
    }
  }

  return getGetEquipmentNamesFetch;
});
