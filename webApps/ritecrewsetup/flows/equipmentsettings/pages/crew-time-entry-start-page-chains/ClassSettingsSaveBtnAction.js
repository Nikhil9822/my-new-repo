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

  class ClassSettingsSaveBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      
   let obj = {
        "p_class_settings_id": current.row.class_settings_id,
        "p_equipment_class": current.row.equipment_class,
        "p_equipment_sub_class": current.row.equipment_sub_class,
        "p_inspection_site_check_in": current.row.inspection_site_check_in,
        "p_inspection_yard_check_in": current.row.inspection_yard_check_in,
        "p_inspection_yard_check_out": current.row.inspection_yard_check_out,

      };

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putEQPRite_ClassSettings',
        body: obj,
      });

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Save Settings',
          displayMode: 'transient',
        });

        return;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Settings Saved Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
    }
  }

  return ClassSettingsSaveBtnAction;
});
