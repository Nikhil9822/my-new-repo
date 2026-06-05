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

  class projectsSelectValueItemChangeChain1 extends ActionChain {

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
      
      $variables.requestObj.projectId = data.projectId;
      $variables.requestObj.projectNumber = data.number;
      $variables.projectName = data.projectName;
      $variables.selectedBuid = data.orgId;
      $variables.selectedbuname = data.businessUnitName;
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpSettings',
      });
      const result = response.body.items || [];
     const match = result.find(bu => bu.business_unit === data.businessUnitName);
      if (match.map_required==="N") {
        $variables.isMap = false;
        
        
      }else{
        $variables.isMap = true;
        
      }
    }
  }

  return projectsSelectValueItemChangeChain1;
});
