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

  class SubmitBtnActionorig extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postInsertRateMaster',
        body: { "rate_schedule": $variables.RateSchDetailName, "rs_description": "Rate Schedule", "bill_rate_schedule_level": $application.variables.billRateScheduleLevel, "multi_currency_enabled": $variables.multiCurrencyEnabled, "allow_location_based_diff": $variables.location_based_differential, "allow_hours_type_rate_diff": $variables.hoursTypeRateDiff, "active_flag": $variables.activeFlag[0] === "Yes" ? "Yes" : "No", "default_flag": $variables.defautFlag, "start_date": $variables.startDate ? $application.functions.formatDate($variables.startDate) : "", "end_date": $variables.endDate ? $application.functions.formatDate($variables.endDate) : "", "contract": $variables.contract, "project_number": $variables.projectNumber, "task_number": $variables.taskNumber },
      });

      const results = await ActionUtils.forEach($variables.scheduleTblADP.data, async (item, index) => {

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postInsertRateDetails',
          body: { "rate_schedule_name": $variables.RateSchDetailName, "non_labor_resource": $variables.NonLabourResource, "location": $variables.selectedRow.location,"addressline1": $variables.selectedRow.addressline1,"addressline2": $variables.selectedRow.addressline2, "city": $variables.selectedRow.city,"country": $variables.selectedRow.country,"zipcode": $variables.selectedRow.zipcode,"longitude":$variables.selectedRow.longitude,"latitude":$variables.selectedRow.latitude,"uom": $variables.uom, "rounding_threshold": $variables.roundingThreshold, "rate_types": $variables.scheduleTblADP.data[index].hour_type, "cost_rate": $variables.scheduleTblADP.data[index].cost_rate ? $variables.scheduleTblADP.data[index].cost_rate : "", "bill_rate": $variables.scheduleTblADP.data[index].bill_rate ? $variables.scheduleTblADP.data[index].bill_rate : "", "currency": $variables.scheduleTblADP.data[index].currency, "rate_type_start_date": $variables.scheduleTblADP.data[index].start_date ? $application.functions.formatDate($variables.scheduleTblADP.data[index].start_date) : "", "rate_type_end_date": $variables.scheduleTblADP.data[index].end_date ? $application.functions.formatDate($variables.scheduleTblADP.data[index].end_date) : "", "equipment_resource_class": $variables.selectedEquipmentClass },
        });

        if (response2.ok) {
          $variables.datavariables = true;
        } else {
          $variables.datavariables = false;
        }
      }, { mode: 'serial' });

      if ($variables.datavariables) {
        const toRateScheduleSearch = await Actions.navigateToPage(context, {
          page: 'rate-schedule-search',
          params: {
            rateSchName: $variables.RateSchDetailName,
          },
        });
      }

      const ojDialog16537378171Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1653737817-1',
        method: 'close',
      });
    }
  }

  return SubmitBtnActionorig;
});
