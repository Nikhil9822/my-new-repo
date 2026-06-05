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

  class extensionReqSaveActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      let extensionReqPayload = {

        "p_comments": $variables.extensionReqObj.extComments,
        "p_date": $variables.extensionReqObj.extDate,
        "p_status": "EXTENSION REQUESTED",
        "p_action": "REQUEST EXTENSION",
        "p_eqp_request_id": $variables.selecedAcceptance.equipment_request_id,
        "p_pagename": $application.currentPage.id
      };

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
        body: extensionReqPayload,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Request Extended Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$variables.extensionReqObj',
  ],
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const extendRequestDialogClose = await Actions.callComponentMethod(context, {
          selector: '#extendRequestDialog',
          method: 'close',
        });

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });

      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Extend the Request',
          displayMode: 'transient',
          type: 'error',
        });

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const extendRequestDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#extendRequestDialog',
          method: 'close',
        });

      }
    }
  }

  return extensionReqSaveActionChain;
});
