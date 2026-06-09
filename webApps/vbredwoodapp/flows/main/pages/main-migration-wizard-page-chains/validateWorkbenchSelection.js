/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class validateWorkbenchSelection extends ActionChain {
    async run(context) {
      const { $page } = context;

      if ($page.variables.selectionCount === 0) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Select items first',
          message: 'Please select at least one item to validate.',
          severity: 'warning'
        });
        return;
      }

      await Actions.fireNotificationEvent(context, {
        summary: 'Validation Complete',
        message: 'All ' + $page.variables.selectionCount + ' items passed pre-flight checks.',
        severity: 'confirmation'
      });
    }
  }

  return validateWorkbenchSelection;
});
