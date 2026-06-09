/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class openMigrateDialog extends ActionChain {
    async run(context) {
      const { $page } = context;

      if ($page.variables.selectionCount === 0) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Select items first',
          message: 'Please select at least one item to migrate.',
          severity: 'warning'
        });
        return;
      }

      $page.variables.migrationDialogCount = $page.variables.selectionCount;
      $page.variables.migrationDialogType = $page.variables.currentTypeLabel;
      $page.variables.isMigrating = false;
      $page.variables.migrationMessage = '';
      $page.variables.migrationProgress = 0;

      const dlg = document.getElementById('workbenchMigrateDialog');
      if (dlg && typeof dlg.open === 'function') {
        dlg.open();
      }
    }
  }

  return openMigrateDialog;
});
