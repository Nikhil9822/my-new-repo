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

  class HyperlinkClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toCrewAdmin = await Actions.navigateToFlow(context, {
        flow: 'crew_admin',
        target: 'parent',
        page: 'crew_admin-search',
        params: {
          RowData: current.row,
          pagetype: 'Create',
        },
      });
    }
  }

  return HyperlinkClickChain;
});
