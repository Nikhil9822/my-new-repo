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

  class AddTaskbtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      if ($variables.taskTblADP.data.length<=3) {

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.taskObj',
  ],
        });

        $variables.taskNum = $variables.taskNum + 1;
        $variables.taskObj.rownum = $variables.taskNum;

        await Actions.fireDataProviderEvent(context, {
          target: $variables.taskTblADP,
          add: {
            data: $variables.taskObj,
          },
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Cannot add more than 4 tasks',
          type: 'error',
          displayMode: 'transient',
        });
        
      }

    
        // const response = await Actions.callRest(context, {
      //   endpoint: 'projectNameList/get11_13_18_05ProjectsProjectIdChildTasks2',
      // });

      // const uniqueTaskObj = await $functions.uniqueTaskObj(response.body.items);

      // $variables.taskLOVADP.data = uniqueTaskObj;
    }
  }

  return AddTaskbtnAction;
});
