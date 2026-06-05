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

  class defaultAssetLocationSelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if (data) {
        // $variables.assetobj.default_loc = value.key;
        $variables.assetobj.default_Asset_org_id = data.OrganizationId;
        const result = await $functions.getmatchedRecords(data.LovDefaultShippingOrgValue, value.key);

        if (result) {

          $variables.assetobj.default_Asset_location_id = result[0].LocationId;
        }
      }




    }
  }

  return defaultAssetLocationSelectValueItemChangeChain;
});
