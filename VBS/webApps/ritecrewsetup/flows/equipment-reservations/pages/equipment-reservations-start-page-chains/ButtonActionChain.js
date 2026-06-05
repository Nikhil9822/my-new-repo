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

  class ButtonActionChain extends ActionChain {

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

      let canReqPayload = {

        "p_comments": $variables.cancelReqObj.canComments,
        "p_date": $variables.cancelReqObj.canDate,
        "p_status": "CANCEL",
        "p_action" : "REQUEST CANCEL",
        "p_eqp_request_id": $variables.selecedAcceptance.equipment_request_id,
        "p_pagename":$application.currentPage.id

      }

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
        body: canReqPayload,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Request Cancelled Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$variables.cancelReqObj',
  ],
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const cancelDialogClose = await Actions.callComponentMethod(context, {
          selector: '#cancelDialog',
          method: 'close',
        });

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Cancel the Request',
          displayMode: 'transient',
          type: 'error',
        });

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const cancelDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#cancelDialog',
          method: 'close',
        });

      }

    }
  }

  return ButtonActionChain;
});
