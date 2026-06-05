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

  class FilePickerSelectChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object[]} params.files
     * @param {any} params.originalEvent
     */
    async run(context, { event, files, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

       if (files.length > 0) {
      

        // const processFile2 = await $functions.processFile(files[0]);
        // $variables.FilteredData = await $functions.updateSelRows(processFile2, $variables.selectedRowdata, $variables.FilteredData);

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const converImageBase64 = await $functions.converImageBase64(files[0]);
        
        const postAttachments = await $functions.postAttachments($variables.selectedRowdata, converImageBase64, $application.variables.user || $application.user.username ||"", files[0]);

        // const response = await Actions.callRest(context, {
        //   endpoint: 'TimeRite_Ords_Service/postEQPRite_FileAttachments',
        //   body: postAttachments,
        // });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestUpdate',
          body: postAttachments,
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'The Selected  file was attached successfully.',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const actionspopupClose = await Actions.callComponentMethod(context, {
            selector: '#actionspopup',
            method: 'close',
          });

          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
          
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Unable to attach the file.',
            displayMode: 'transient',
            type: 'error',
          });

          const actionspopupClose2 = await Actions.callComponentMethod(context, {
            selector: '#actionspopup',
            method: 'close',
          });

          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

        }

        const loadingDialogClose3 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

      }
    }
  }

  return FilePickerSelectChain1;
});
