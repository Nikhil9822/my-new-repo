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

  class SubmitInventoryTranscationButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('inventoryValid');

      if (validateGroup==="valid") {

        if($variables.selectionrow.project_id){
          const loadingDialogOpen = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });

          const postinventory = await $functions.postinventory($variables.inventoryObj, $variables.selectionrow);

          const response = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/post11_13_18_05InventoryStagedTransactions',
            body: postinventory,
          });

          if (response.ok) {
            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Inventory Transaction Created',
              type: 'confirmation',
              displayMode: 'transient',
            });

          }else{
            const loadingDialogClose3 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to create Transaction',
              type: 'error',
              displayMode: 'transient',
            });
          }
          

        }else{
 await Actions.fireNotificationEvent(context, {
            summary: 'Please select record ',
            type: 'error',
            displayMode: 'transient',
          });
        }
      }else{

        const loadingDialogClose4 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

         await Actions.fireNotificationEvent(context, {
          summary: 'Please fill required fields',
          type: 'error',
          displayMode: 'transient',
        });

      }
    }
  }

  return SubmitInventoryTranscationButtonActionChain;
});
