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

  class copyButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables , $functions } = context;
      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      $variables.projectBasedRowData = $variables.selectedRowdata;
      $variables.Dialoguelabel = 'Copy';

  //     await Actions.resetVariables(context, {
  //       variables: [
  //   '$page.variables.projectBasedRowData.hours_type  ',
  //   '$page.variables.projectBasedRowData.mon_quantity',
  //   '$page.variables.projectBasedRowData.tue_quantity',
  //   '$page.variables.projectBasedRowData.wed_quantity',
  //   '$page.variables.projectBasedRowData.thu_quantity',
  //   '$page.variables.projectBasedRowData.fri_quantity',
  //   '$page.variables.projectBasedRowData.sat_quantity',
  //   '$page.variables.projectBasedRowData.sun_quantity',
  //   '$page.variables.projectBasedRowData.cost_rate',
  // ],
  //     });
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
      ].map(sequence => sequence()))
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getRateScheduleDetailsbyName',
        uriParams: {
          'p_rate_schedule_name': $page.variables.projectBasedRowData.rate_schedule_name,
        },
      });

      $variables.crewHoursTypeCost = response.body.items;

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
      const timesDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'open',
      });
    }
  }

  return copyButtonActionChain;
});
