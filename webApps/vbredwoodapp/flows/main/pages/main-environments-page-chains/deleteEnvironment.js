/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class deleteEnvironment extends ActionChain {
    async run(context) {
      const { $page } = context;
      const envId = $page.variables.selectedEnv.id;

      try {
        const result = await Actions.callRest(context, {
          endpoint: 'fmtAtpService/deleteEnvironment',
          uriParams: { id: envId }
        });

        if (result.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Deleted',
            message: 'Environment deleted successfully.',
            severity: 'confirmation'
          });
          $page.variables.selectedEnv = {};
          $page.variables.connectionTestResult = {};
          const dlg = document.getElementById('deleteEnvDialog')
            || document.querySelector('oj-dialog[id$="deleteEnvDialog"]');
          if (dlg && typeof dlg.close === 'function') { dlg.close(); }
          await Actions.invokeActionChain(context, { chain: 'loadEnvironments' });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Delete Failed',
            message: 'Could not delete environment (HTTP ' + result.status + ')',
            severity: 'error'
          });
        }
      } catch (e) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Connection Error',
          message: 'Could not reach ATP service: ' + (e && e.message ? e.message : 'unknown error'),
          severity: 'error'
        });
      }
    }
  }

  return deleteEnvironment;
});
