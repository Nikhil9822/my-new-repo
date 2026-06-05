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

  class SubmitSelectedRowAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
     
      const validateGroup = await $application.functions.validateGroup('requestvalgroup');

      if (validateGroup === 'valid') {

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_ReqHeaderSubmit',
          body: {},
        });

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/TR_EQP_MAXCartNumber',
        });
        let eqp_request_number;

        if (response3.ok) {
          eqp_request_number = response3.body.eqp_request_number;
        }
        let isSaved = true;
        let cartRequest = null;
        let requestNumber = 0;
        if (eqp_request_number) {
          const results = await ActionUtils.forEach($variables.CartArray, async (item, index) => {

            const loadingDialogOpen = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'open',
            });

            const formatDate = await $functions.formatDate($variables.selectedRowRequest.start_date);
            const formatDate2 = await $functions.formatDate($variables.selectedRowRequest.end_date);
            const cartPayloadgenerator = await $functions.cartPayloadgenerator(eqp_request_number, $variables.selectedRowRequest, $variables.CartArray[index], $variables.CartArray.length, response2.body.items[0].equipment_cart_number, formatDate, formatDate2, $application.variables.user  || $application.user.username, $variables.softReservation, $variables.invLocationObj, undefined, $variables.assetgroup, $variables.fileObj);



            const response4 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestCartSubmit',
              body: cartPayloadgenerator,
            });

            const response = await Actions.callRest(context, {
              endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_EMAIL_NOTIFICATI1_0TriggerEmailNotification',
              uriParams: {
                'USER_NAME': $application.variables.user ||  $application.user.username,
                pageId: 'equipment-requisition-start',
                'p_request_number': eqp_request_number,
                'Role_name': "OII Equipment Requestor JR",
              },
            });

            if (!response4.ok) {
              isSaved = false;

            } else {
              requestNumber = response4.body.eqp_request_number;
            }



          }, { mode: 'serial' });
          if (isSaved) {
            await Actions.fireNotificationEvent(context, {
              summary: "Equipment Request: " + requestNumber + " submitted Successfully",
              displayMode: 'transient',
              type: 'confirmation',
            });

            $variables.iscart = false;

            await Actions.resetVariables(context, {
              variables: [
                '$page.variables.CartArray',
              ],
            });

            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });
          }
          else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Submit Equipment Details',
              displayMode: 'transient',
              type: 'error',
            });

            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            return;
          }
        }




        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.selectedRowRequest',
            '$page.variables.EqpMasterWorkOrderADP.data',
          ],
        });

        const submitRequestDlgClose = await Actions.callComponentMethod(context, {
          selector: '#submitRequestDlg',
          method: 'close',
        });
      }
    }
  }

  return SubmitSelectedRowAction;
});
