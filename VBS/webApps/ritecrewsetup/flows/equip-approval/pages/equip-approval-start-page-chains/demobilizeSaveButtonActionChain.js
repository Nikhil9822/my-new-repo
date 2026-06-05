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

  class demobilizeSaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen2 = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      if ($variables.demobObj.date) {
        let obj = {
          "p_disband_approved_comments": $variables.demobObj.comments,
          "p_disband_approved_date": $functions.formatDate($variables.demobObj.date),
          "p_disband_request_date": $functions.formatDate($variables.demobObj.date)
        };
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/putEQPRite_EqpManagerApproval',
          uriParams: {
            'p_equipment_request_id': $variables.selectionrow.equipment_request_id,
          },
          body: obj,
        });

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Demobilization request has been initiated successfully.',
            type: 'confirmation',
            displayMode: 'transient',
          });

          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.callChain(context, {
            chain: 'DemobilizeDialogCloseButtonActionChain',
          });

          await Actions.callChain(context, {
            chain: 'SearchBtnAction',
          });

        } else {
          const loadingDialogClose3 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Intiate Demobilization Request',
            message: 'Please contact the System Administrator for assistance.',
            displayMode: 'transient',
            type: 'error',
          });

        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      } else {

        const loadingDialogClose4 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Date',
          type: 'error',
          displayMode: 'transient',
        });

      }
    }
  }

  return demobilizeSaveButtonActionChain;
});
