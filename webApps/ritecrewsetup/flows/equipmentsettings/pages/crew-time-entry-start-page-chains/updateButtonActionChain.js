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

  class updateButtonActionChain extends ActionChain {

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

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const updateexpenseTransaction = await $functions.updateexpenseTransaction($variables.miscSettingsObj);

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putEQPRite_MISCTransactions',
        body: updateexpenseTransaction,
        uriParams: {
          'p_business_unit': $variables.miscSettingsObj.business_unit,
        },
      });

      if (response.ok) {
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          type: 'confirmation',
          displayMode: 'transient',
          summary: 'Successfully updated',
        });
      }else{
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          type: 'error',
          displayMode: 'transient',
          summary: 'Failed to update',
        });
        
      }
    }
  }

  return updateButtonActionChain;
});
