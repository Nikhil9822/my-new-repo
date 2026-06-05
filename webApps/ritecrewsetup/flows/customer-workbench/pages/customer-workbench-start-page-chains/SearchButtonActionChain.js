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

  class SearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetManagerQuoteDetails',
        uriParams: {
          'p_rental_reservation_number': $variables.headerobj.reservation ? $variables.headerobj.reservation : "",
          'p_customer_name': $variables.headerobj.customer ? $variables.headerobj.customer : "",
        },
      });

      $variables.workbenchADP.data = response.body.items;

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.workbenchADP,
      });

      if ($variables.workbenchADP.data.length<=0) {
        await Actions.fireNotificationEvent(context, {
          summary: 'No Data To Display',
          displayMode: 'transient',
          type: 'error',
        });
      }
    }
  }

  return SearchButtonActionChain;
});
