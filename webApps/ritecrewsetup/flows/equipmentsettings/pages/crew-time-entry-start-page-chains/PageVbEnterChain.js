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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response2 = await Actions.callRest(context, {
        endpoint: 'fusion_cloud/getEqpSubClass',
      });

      $variables.eqpSubClassADP.data = response2.body.items[0].lookupCodes;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPAdmin_ChecklistSearch',
      });

      const removeDuplicates = await $functions.removeDuplicates(response.body.items);

      $variables.getEqpnamesAdp.data = removeDuplicates;

      await Actions.callChain(context, {
        chain: 'ButtonActionChain_addIOT',
      });
    }
  }

  return PageVbEnterChain;
});
