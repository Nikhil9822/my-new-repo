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

  class commentsSaveButtonActionAchain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      
      let obj = {
        "p_eqp_request_id": $variables.selectionrow.equipment_request_id,
        "p_status": $variables.selectionrow.status,
        // "p_date": "NULL",
        "p_action":"COMMENTS UPDATE",
        "p_pagename": $application.currentPage.id,
        "p_comments": $variables.commentsDialogObj.comments
      };

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
        body: obj,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Comments Saved Successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });

      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Save Comments',
          type: 'error',
          displayMode: 'transient',
        });

      }

      await Actions.resetVariables(context, {
        variables: [
    '$variables.commentsDialogObj',
  ],
      });

      const commentsDialogClose = await Actions.callComponentMethod(context, {
        selector: '#commentsDialog',
        method: 'close',
      });

      await Actions.callChain(context, {
        chain: 'SearchBtnAction',
      });
    }
  }

  return commentsSaveButtonActionAchain;
});
