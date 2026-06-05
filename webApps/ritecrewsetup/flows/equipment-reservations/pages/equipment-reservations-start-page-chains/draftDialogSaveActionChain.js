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

  class draftDialogSaveActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const saveDraft = await $functions.saveDraft($variables.draftobj, $variables.selectionrow, $application.currentPage.id, $application.variables.user || $application.variables.user);

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putEQPRite_RequestEdit',
        uriParams: {
          'p_equipment_request_id': $variables.selectionrow.equipment_request_id,
        },
        body: saveDraft,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          type: 'confirmation',
          summary: 'Request Updated Successfully',
          displayMode: 'transient',
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const editDialogClose = await Actions.callComponentMethod(context, {
          selector: '#editDialog',
          method: 'close',
        });

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });
        
      }else{

        await Actions.fireNotificationEvent(context, {
          type: 'error',
          displayMode: 'transient',
          summary: 'Failed To Update Request',
        });

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        const editDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#editDialog',
          method: 'close',
        });
        
      }
    }
  }

  return draftDialogSaveActionChain;
});
