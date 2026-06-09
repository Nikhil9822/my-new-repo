/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';

  class cancelWorkbenchMigration extends ActionChain {
    async run(context) {
      const { $page } = context;

      // Do not close if migration is in progress
      if ($page.variables.isMigrating) {
        return;
      }

      const dlg = document.getElementById('workbenchMigrateDialog');
      if (dlg && typeof dlg.close === 'function') {
        dlg.close();
      }
    }
  }

  return cancelWorkbenchMigration;
});
