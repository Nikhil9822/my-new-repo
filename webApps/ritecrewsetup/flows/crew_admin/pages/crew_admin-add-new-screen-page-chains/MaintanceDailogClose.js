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

  class MaintanceDailogClose extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const maintanceOperatingDailogClose = await Actions.callComponentMethod(context, {
        selector: '#maintanceOperatingDailog',
        method: 'close',
      });
    }
  }

  return MaintanceDailogClose;
});
