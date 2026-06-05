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

  class AcceptBtnAction extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $variables, $functions, $application } = context;


      // Show loader at start
      await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const initialUpdatePayload = {
        "equipment_request_id": $variables.selectionrow.equipment_request_id,
        "equipment_id":$variables.selectionrow.equipment_id,
        "inspection_stage": 'Project - Check In',
        "eqp_master_status": "EQP PROJECT INSPECTION"
      };



      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
        body: initialUpdatePayload,
      });


      if (!response.ok) {
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });



        await Actions.fireNotificationEvent(context, {
          summary: 'Initial status update failed',
          displayMode: 'transient',
          type: 'error',
        });

        return;
      } else {
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Accepted Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        const actionsPopupClose = await Actions.callComponentMethod(context, {
          selector: '#ActionsPopup',
          method: 'close',
        });

        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });

        let obj =
        {
          "Message": "FYI- Request No."+ $variables.selectionrow.eqp_request_number+"  has been Accepted by. "  + $application.variables.user,
          "TaskCreator":$application.variables.user,
          "Role_Name": "OII Equipment Timekeeper"
        };

        const response2 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
          body: obj,
        });

        // const response3 = await Actions.callRest(context, {
        //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_EMAIL_NOTIFICATI1_0TriggerEmailNotification',
        // });
      }


    }
  }

  return AcceptBtnAction;
});
