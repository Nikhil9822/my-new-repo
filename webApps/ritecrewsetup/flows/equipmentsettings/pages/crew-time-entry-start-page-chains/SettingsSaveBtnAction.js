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

  class SettingsSaveBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
// debugger;
      const updatesettings = await $functions.updatesettings(current.row);

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putEqpSettings',
        uriParams: {
          'p_id': updatesettings.p_id,
        },
        body: updatesettings,
      });

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Update Record',
          displayMode: 'transient',
        });
      
        return;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Record Updated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
    }
  }

  return SettingsSaveBtnAction;
});
