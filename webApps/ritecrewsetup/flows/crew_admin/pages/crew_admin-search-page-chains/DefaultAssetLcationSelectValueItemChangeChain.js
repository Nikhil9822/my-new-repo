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

  class DefaultAssetLcationSelectValueItemChangeChain extends ActionChain {

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
         const result = await $functions.getmatchedRecords(data.LovDefaultShippingOrgValue, key);

        if (result) {

          $variables.RowData.default_asset_location_id = result[0].LocationId;
          $variables.RowData.default_asset_org_id = data.OrganizationId;
        }
      }
      
    }
  }

  return DefaultAssetLcationSelectValueItemChangeChain;
});
