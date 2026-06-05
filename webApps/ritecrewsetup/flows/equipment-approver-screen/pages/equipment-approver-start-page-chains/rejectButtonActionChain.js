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

  class rejectButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const status = await $functions.checkStatus($variables.FilteredData);

      const result = ($variables.FilteredData || []).map(r => Array.isArray(r.status) ? ({ ...r, status: r.status.filter(s => s === "ERROR" || s === "SUBMITTED") }) : ((r.status === "ERROR" || r.status === "SUBMITTED") ? r : null)).filter(Boolean).filter(r => Array.isArray(r.status) ? r.status.length : true)

      if (status) {
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        let ordsResponse;
        const results = await ActionUtils.forEach(result, async (item, index) => {

          const createRejectReq = await $functions.createRejectReq(item);

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putEqpSubmitTimeEntry',
            body: createRejectReq,
          });

          ordsResponse = response;
        }, { mode: 'serial' });

        if (ordsResponse.ok) {
          const loadingDialogClose3 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'The selected records have been successfully rejected.',
            type: 'confirmation',
            displayMode: 'transient',
          });
        }else{
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to Reject Records',
            type: 'error',
            displayMode: 'transient',
          });
          
        }

        await Actions.resetVariables(context, {
          variables: [
    '$variables.approverMainTableADP.data',
  ],
        });

        await Actions.callChain(context, {
          chain: 'SearchButtonActionChain_New',
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        
      }else{
        const loadingDialogClose4 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Records With Submitted Status',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return rejectButtonActionChain;
});
