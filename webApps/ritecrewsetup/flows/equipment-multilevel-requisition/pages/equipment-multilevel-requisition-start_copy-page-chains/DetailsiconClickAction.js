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

  class DetailsiconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.current 
     */
    async run(context, { current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      $variables.selectedRow = current;

      const requestdetailsOpen = await Actions.callComponentMethod(context, {
        selector: '#requestdetails',
        method: 'open',
      });

    const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/AssetMaintCost',
            uriParams: {
              'p_asset_number': $variables.selectedRow.asset_number,
            },
          });

          $variables.workordercostArray = response.body.items;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/AssetFACost',
            uriParams: {
              'p_asset_number': $variables.selectedRow.asset_number,
            },
          });

          $variables.FACostArray = response2.body.items;
        },
      ].map(sequence => sequence()));
    }
  }

  return DetailsiconClickAction;
});
