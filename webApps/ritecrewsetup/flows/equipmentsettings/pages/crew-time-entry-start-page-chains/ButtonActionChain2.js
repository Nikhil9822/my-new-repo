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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

        const results = await ActionUtils.forEach($variables.eqpchecklistSaveADP.data, async (item, index) => {

          const savechecklistdata = await $functions.savechecklistdata(item, $application.user.fullName);

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPAdmin_ChecklistSearch',
            body: savechecklistdata,
          });

          if (response.ok) {
            $variables.insertStatus = true;
          }
        }, { mode: 'serial' });

        if ($variables.insertStatus) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Data Saved Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

        const eqpchecklistClose = await Actions.callComponentMethod(context, {
          selector: '#eqpchecklist',
          method: 'close',
        });
          
        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Save Data',
            displayMode: 'transient',
            type: 'error',
          });
          
        }

        await Actions.fireDataProviderEvent(context, {
          refresh: null,
          target: $variables.eqpchecklistSaveADP,
        });
    }
  }

  return ButtonActionChain2;
});
