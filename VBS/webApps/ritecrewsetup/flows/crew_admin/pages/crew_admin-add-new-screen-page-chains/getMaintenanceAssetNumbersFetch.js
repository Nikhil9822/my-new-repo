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

  class getMaintenanceAssetNumbersFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'getContractSummary/getMaintenanceAssetNumbers',
        responseType: 'getMaintenanceAssetNumbersResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          'P_organization_id': $variables.mainorgunitid,
        },
      });

      return callRestEndpoint1;
    }
  }

  return getMaintenanceAssetNumbersFetch;
});
