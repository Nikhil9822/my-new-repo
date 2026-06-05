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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // const loadingDialogOpen = await Actions.callComponentMethod(context, {
      //   selector: '#loadingDialog',
      //   method: 'open',
      // });

      // await Actions.callChain(context, {
      //   id: 'searchAction',
      // });

      // const loadingDialogClose = await Actions.callComponentMethod(context, {
      //   selector: '#loadingDialog',
      //   method: 'close',
      // });
    }
  }

  return PageVbEnterChain;
});
