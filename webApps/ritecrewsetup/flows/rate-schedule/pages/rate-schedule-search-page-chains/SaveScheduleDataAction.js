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

  class SaveScheduleDataAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.scheduleRowData.start_date = $application.functions.formatDate($variables.scheduleRowData.start_date);
      $variables.scheduleRowData.end_date = $application.functions.formatDate($variables.scheduleRowData.end_date);

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putEqpRateScheduleHeaderUpdate',
        body: $variables.scheduleRowData,
      });

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Schedule Data',
          displayMode: 'transient',
        });

        return;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Schedule Update Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.callChain(context, {
          chain: 'CloseScheduleDataAction',
        });
      }
    }
  }

  return SaveScheduleDataAction;
});
