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

  class submitActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('misc');
      if (validateGroup === "valid") {
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const saveMiscData = await $functions.saveMiscData($variables.miscObj, $application.variables.user ||$application.user.username || "", undefined);

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_MISCTransactions',
          body: saveMiscData,
        });

        if (response.ok) {
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Your Miscellaneous transaction settings  have been saved successfully.',
            type: 'confirmation',
            displayMode: 'transient',
          });
        } else {

          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
          // let errormsg;
          const unique = await $functions.isunique(response.body);

          await Actions.fireNotificationEvent(context, {
            summary: unique,
            type: 'error',
            displayMode: 'transient',
          });

        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please ensure that all required fields are selected before submitting.',
          type: 'error',
          displayMode: 'transient',
        });

      }


    }
  }

  return submitActionChain;
});
