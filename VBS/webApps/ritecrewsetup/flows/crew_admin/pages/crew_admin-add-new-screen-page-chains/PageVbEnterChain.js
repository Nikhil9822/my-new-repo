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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

       $variables.MasterTabObj.status = true;
       

      const maintanceOperatingDailogOpen = await Actions.callComponentMethod(context, {
        selector: '#maintanceOperatingDailog',
        method: 'open',
      });

      const response3 = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_MAINTENA_ORG_LOV1_0GetMaintenanceOrgs2',
      });
      if(response3.ok){
       $variables.maintaceOrgADP.data = response3.body.items;
      }

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/InventoryOrganizations',
      });

      $variables.inventoryOrganizationsListADP.data = response.body.items;

      // const projects = await Actions.callRest(context, {
      //   endpoint: 'projectNameList/get11_13_18_05Projects',
      // });

      // $variables.projectNameADP.data = projects.body.items;

     

      // const response2 = await Actions.callRest(context, {
      //   endpoint: 'getContractSummary/getEQUIPMENT_RITEITEMS_LOV1_0GetItemValues',
      // });

      // const uniqueexp = await $functions.uniqueexp(response2.body.items);

      // $variables.inventoryitemAdp.data = uniqueexp;

    
    }
  }

  return PageVbEnterChain;
});
