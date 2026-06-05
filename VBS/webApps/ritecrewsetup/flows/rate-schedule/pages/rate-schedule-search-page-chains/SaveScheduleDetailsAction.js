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

  class SaveScheduleDetailsAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;


      const startdate = await $application.functions.formatDate($variables.ScheduleDetailsRowData.rate_type_start_date);

      const endDate = $application.functions.formatDate($variables.ScheduleDetailsRowData.rate_type_end_date);
      const saveRateSchedule = await $functions.saveRateSchedule($variables.ScheduleDetailsRowData, startdate, endDate)
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putEqpRateScheduleDetailsUpdate',
        body: saveRateSchedule,
      });


      if (!response.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Update the Schedule Details',
          displayMode: 'transient',
        });

        return;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Schedule Details updated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.callChain(context, {
          chain: 'CloseScheduleDetailsAction',
        });
      }
    }
  }

  return SaveScheduleDetailsAction;
});
