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

  class CopyBtnAddAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      // await Actions.resetVariables(context, {
      //   variables: [
      //     '$page.variables.projectBasedRowData.crewsetup_eqp_header_id',
      //   ],
      // });

      // const maxheaderid = await $functions.getmaxheaderid(JSON.stringify($variables.projectBasedTimesheetADP.data));
      // $variables.projectBasedRowData.iscopy = true;
      // $variables.projectBasedRowData.crewsetup_eqp_header_id = maxheaderid;
      // let request_id = 

      // let id = $variables.selectedRowdata.equipment_request_id;
      // id = Date.now();
      // $variables.projectBasedRowData.equipment_request_id = id;

      
      // await Actions.fireDataProviderEvent(context, {
      //   target: $variables.projectBasedTimesheetADP,
      //   add: {
      //     data: $variables.projectBasedRowData,
      //   },
      // });
    //   let data = $variables.projectBasedTimesheetADP.data;
    // // debugger;
    //   await Actions.fireDataProviderEvent(context, {
    //     target: $variables.projectBasedTimesheetADP,
    //     refresh: null,
    //   });

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const dateFormatter = await $functions.dateFormatter($variables.selectedRowdata.week_start_date, $variables.selectedRowdata.week_end_date, $variables.selectedRowdata.crewdate);

      let payloadGenerator = await $functions.payloadGenerator($variables.projectBasedRowData, $application.user.email, dateFormatter.startDate, dateFormatter.endDate, $variables.searchobj.dateRange1, dateFormatter.crewDate, $variables.searchobj.specific, $variables.maxweekid, $application.variables.user || $application.user.username);

      payloadGenerator.p_time_entry_id = $variables.projectBasedRowData.time_entry_id;
      // debugger;
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEqpTimeEntrySearch',
        body: payloadGenerator,
      });

      await Actions.callChain(context, {
        chain: 'SearchButtonAction_New',
      });

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      const timesDialogClose = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'close',
      });

    }
  }

  return CopyBtnAddAction;
});
