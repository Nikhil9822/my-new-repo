/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class startWorkbenchMigration extends ActionChain {
    async run(context) {
      const { $page } = context;

      $page.variables.isMigrating = true;
      $page.variables.migrationMessage = 'Connecting to target environment...';
      $page.variables.migrationProgress = 10;

      await new Promise(r => setTimeout(r, 800));

      $page.variables.migrationMessage = 'Migrating objects...';
      $page.variables.migrationProgress = 40;

      await new Promise(r => setTimeout(r, 1000));

      $page.variables.migrationMessage = 'Verifying migration...';
      $page.variables.migrationProgress = 80;

      await new Promise(r => setTimeout(r, 600));

      $page.variables.migrationProgress = 100;
      $page.variables.migrationMessage = 'Migration complete!';

      await new Promise(r => setTimeout(r, 400));

      // Close dialog
      const dlg = document.getElementById('workbenchMigrateDialog');
      if (dlg && typeof dlg.close === 'function') {
        dlg.close();
      }

      $page.variables.isMigrating = false;

      const migratedCount = $page.variables.selectionCount;
      const migratedType = $page.variables.currentTypeLabel;

      await Actions.fireNotificationEvent(context, {
        summary: 'Migration Complete',
        message: 'Successfully migrated ' + migratedCount + ' ' + migratedType,
        severity: 'confirmation'
      });

      // Reset selection
      $page.variables.selectedObjects = [];
      $page.variables.selectedRows = { row: { keys: [] } };
      $page.variables.selectionCount = 0;

      // Re-apply filter to refresh table (no selection shown)
      const all = $page.variables.objectsData;
      $page.variables.filteredData = all;
      $page.variables.filteredObjectsADP = { data: all, keyAttributes: 'id' };
    }
  }

  return startWorkbenchMigration;
});
