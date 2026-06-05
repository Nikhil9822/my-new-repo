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

  class TableFirstSelectedRowChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {any} params.rowData 
     */
    async run(context, { rowKey, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const results = await Promise.all([
        async () => {

          await Actions.resetVariables(context, {
            variables: [
    '$variables.subInvAdp.data',
  ],
          });

          $variables.selectionrow = rowData;
            const response4 = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05Subinventories2',
              uriParams: {
                q: "OrganizationId="+rowData.organization_id,
              },
            });

      $variables.subInvAdp.data = response4.body.items;
          // $variables.projExpenseObj.quantity=rowData.equip_req_quantity;
          // $variables.projExpenseObj.expenditureType=rowData.expenditure_type;
          // $variables.projExpenseObj.originalTransactionReference = rowData.batchname;
          $variables.projExpenseObj.nonlaborResource=rowData.non_labor_resource;
        },
        async () => {
// debugger;
          const response = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05FinBusinessUnitsLOV',
          });
        },
      ].map(sequence => sequence()));
    }
  }

  return TableFirstSelectedRowChangeChain1;
});
