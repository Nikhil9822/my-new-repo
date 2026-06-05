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

  class SelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;

      if (data) {

        $page.variables.AssetsTabObj.project_number = data.number;
        $page.variables.AssetsTabObj.project_name = data.name;
        // $variables.AssetsTabObj.project_id = data.projectId;
         $variables.AssetsTabObj.prjId = data.projectId;
      }

      // const response = await Actions.callRest(context, {
      //   endpoint: 'projectNameList/get11_13_18_05ProjectsProjectIdChildTasks2',
      //   uriParams: {
      //     ProjectId: $variables.AssetsTabObj.project_id,
      //   },
      // });

      // $variables.getTaskDetailsADP.data = response.body.items;
    }
  }

  return SelectValueItemChangeChain;
});
