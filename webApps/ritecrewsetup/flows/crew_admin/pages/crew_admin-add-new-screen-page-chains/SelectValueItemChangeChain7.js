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

  class SelectValueItemChangeChain7 extends ActionChain {

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
      const { $page, $flow, $application, $constants, $variables } = context;
      if(data){
          $variables.mainorgunitid = data.Asset_org_id;
//            let assetPath='/Custom/EquipmentRite/Asset_Item_Maintenance_Report.xdo';
//           // const generateBIPReportRequestPayload3 = await $application.functions.generateBIPReportRequestPayload(assetPath);

//           const generateBIPReportRequestPayloadParams = await $application.functions.generateBIPReportRequestPayload_params(assetPath, [
//   {
//     name: 'P_organization_id',
//     value:  $variables.mainorgunitid,
//   },
// ]);

//           const response4 = await Actions.callRest(context, {
//             endpoint: 'fusion_cloud/postXmlpserverServicesExternalReportWSSService',
//             body: generateBIPReportRequestPayloadParams,
//           });

//           const convertBIPSoapResponseToArray3 = await $application.functions.convertBIPSoapResponseToArray(response4.body);
// debugger;
//           $application.variables.maintainenceAssetAdp.data = convertBIPSoapResponseToArray3;
      }
      
    }
  }

  return SelectValueItemChangeChain7;
});
