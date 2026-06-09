/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class loadAuditTrail extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.isLoading = true;
      try {
        $page.variables.auditData = [
          { id: 1, timestamp: '2026-05-19 08:35:12', user: 'Dinesh Neredu', action: 'Migration Executed', resource: 'HCM Full Migration Pipeline', status: 'Success', details: 'Migrated 45 objects from UAT to Production' },
          { id: 2, timestamp: '2026-05-18 14:22:05', user: 'Priya Sharma', action: 'Environment Updated', resource: 'Production HCM', status: 'Success', details: 'Updated OAuth2 credentials' },
          { id: 3, timestamp: '2026-05-18 11:10:44', user: 'Raj Kumar', action: 'Version Tag Created', resource: 'v2.1.0', status: 'Success', details: 'Tagged commit a1b2c3d as v2.1.0' },
          { id: 4, timestamp: '2026-05-17 16:05:30', user: 'Dinesh Neredu', action: 'Pipeline Created', resource: 'ERP Reports Sync', status: 'Success', details: 'New pipeline created with 12 objects' },
          { id: 5, timestamp: '2026-05-10 11:02:18', user: 'Priya Sharma', action: 'Migration Failed', resource: 'CX Pages Deploy', status: 'Failed', details: 'Failed to deploy 2 of 8 objects — dependency conflict' },
          { id: 6, timestamp: '2026-05-09 09:00:00', user: 'System', action: 'Scheduled Run', resource: 'Dev-to-UAT Nightly', status: 'Success', details: 'Automated nightly sync completed' }
        ];
        $page.variables.totalRecords = $page.variables.auditData.length;
      } catch (e) {
        await Actions.fireCustomEvent(context, {
          name: 'vbNotification',
          payload: { summary: 'Failed to load audit trail', messageType: 'error', displayMode: 'transient' }
        });
      } finally {
        $page.variables.isLoading = false;
      }
    }
  }
  return loadAuditTrail;
});
