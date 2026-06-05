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

  class editButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
const loadingDialogOpen = await Actions.callComponentMethod(context, {
  selector: '#loadingDialog',
  method: 'open',
});
       $page.variables.projectBasedRowData = $variables.selectedRowdata;
      $page.variables.EditType = 'Edit';
      $page.variables.Dialoguelabel = 'Edit';
      $page.variables.projectBasedRowData.fri_usage = $variables.selectedRowdata.fri_quantity;
      $page.variables.projectBasedRowData.mon_usage = $variables.selectedRowdata.mon_quantity;
      $page.variables.projectBasedRowData.sat_usage = $variables.selectedRowdata.sat_quantity;
      $page.variables.projectBasedRowData.sun_usage = $variables.selectedRowdata.sun_quantity;
      $page.variables.projectBasedRowData.thu_usage = $variables.selectedRowdata.thu_quantity;
      $page.variables.projectBasedRowData.tue_usage = $variables.selectedRowdata.tue_quantity;
      $page.variables.projectBasedRowData.wed_usage = $variables.selectedRowdata.wed_quantity;

      

      const results = await Promise.all([
        async () => {

          const weekDateBetween = await $functions.isWeekDateBetween($variables.projectBasedRowData.effective_start_date, $variables.projectBasedRowData.effective_end_date, $variables.datesArray[0].date);

          $variables.isEditObj.mon =weekDateBetween;
        },
        async () => {

          const weekDateBetween = await $functions.isWeekDateBetween($variables.projectBasedRowData.effective_start_date, $variables.projectBasedRowData.effective_end_date, $variables.datesArray[1].date);
          $variables.isEditObj.tue =weekDateBetween;
        },
        async () => {
         const weekDateBetween = await $functions.isWeekDateBetween($variables.projectBasedRowData.effective_start_date, $variables.projectBasedRowData.effective_end_date, $variables.datesArray[2].date);
         $variables.isEditObj.wed =weekDateBetween;
        },
        async () => {
       const weekDateBetween = await $functions.isWeekDateBetween($variables.projectBasedRowData.effective_start_date, $variables.projectBasedRowData.effective_end_date, $variables.datesArray[3].date);
       $variables.isEditObj.thu =weekDateBetween;
        },
        async () => {
          const weekDateBetween = await $functions.isWeekDateBetween($variables.projectBasedRowData.effective_start_date, $variables.projectBasedRowData.effective_end_date, $variables.datesArray[4].date);
          $variables.isEditObj.fri =weekDateBetween;
        },
        async () => {
          const weekDateBetween = await $functions.isWeekDateBetween($variables.projectBasedRowData.effective_start_date, $variables.projectBasedRowData.effective_end_date, $variables.datesArray[5].date);
          $variables.isEditObj.sat =weekDateBetween;
        },
        async () => {
          const weekDateBetween = await $functions.isWeekDateBetween($variables.projectBasedRowData.effective_start_date, $variables.projectBasedRowData.effective_end_date, $variables.datesArray[6].date);
          $variables.isEditObj.sun =weekDateBetween;
        },
        async () => {
          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getEQPRite_MasterNonLaborDetails',
            uriParams: {
              'p_equipment_id': $variables.selectedRowdata.equipment_id,
            },
          });

          const response2 = await Actions.callRest(context, {
            endpoint: 'getContractSummary/getEQUIPMENT_RITEEQP_CONTRACT_NONLABOR_DETAILS1_0GetNlrValues',
            uriParams: {
              'p_project_id': $variables.selectedRowdata.project_id,
            },
          });
// debugger;
          const mergeOicAndMaster = await $functions.mergeOicAndMaster(response2.body.items, response.body.items);

          $variables.nonlaborResourceAdp.data = mergeOicAndMaster;
        },
      ].map(sequence => sequence()));

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      const callComponentMethodTimesDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'open',
      });
    }
  }

  return editButtonActionChain;
});
