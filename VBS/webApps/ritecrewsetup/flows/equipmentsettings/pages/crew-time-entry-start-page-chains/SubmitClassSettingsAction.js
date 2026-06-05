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

  class SubmitClassSettingsAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('ClassSettings');

      if (validateGroup === 'valid') {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const obj = {
          "p_equipment_class": $variables.ClassSettingsObj.eqpclass,
          "p_equipment_sub_class": $variables.ClassSettingsObj.eqpSubClass,
          "p_inspection_yard_check_out": $variables.ClassSettingsObj.inspcheckout,
          "p_inspection_site_check_in": $variables.ClassSettingsObj.inspsitecheckIn,
          "p_inspection_yard_check_in": $variables.ClassSettingsObj.inspcheckin,
          "p_attribute1": "",
          "p_attribute2": "",
          "p_attribute3": "",
          "p_attribute4": "",
          "p_attribute5": "",
          "p_created_by": $application.user.email,
          "p_last_updated_by": $application.user.email
        };

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_ClassSettings',
          body: obj,
        });

        if (!response.ok) {
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

         const unique = await $functions.isunique(response.body);

          await Actions.fireNotificationEvent(context, {
            summary: unique,
            displayMode: 'transient',
          });

          return;
        } else {
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Settings Submitted Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
        }
      }
    }
  }

  return SubmitClassSettingsAction;
});
