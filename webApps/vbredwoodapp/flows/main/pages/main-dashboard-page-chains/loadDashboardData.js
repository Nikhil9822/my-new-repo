/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';

  class loadDashboardData extends ActionChain {
    async run(context) {
      const { $page } = context;
      $page.variables.isLoading = true;
      try {
        // Seed KPIs with mock data until REST services are wired
        $page.variables.kpiTotalObjects = 1248;
        $page.variables.kpiActiveMigrations = 3;
        $page.variables.kpiFailedJobs = 2;
        $page.variables.kpiEnvironments = 4;
        $page.variables.kpiSuccessRate = 94;

        $page.variables.envHealthData = [
          { name: 'Production', type: 'Oracle Fusion HCM', status: 'Healthy', severity: 'success', lastSync: '2 min ago' },
          { name: 'UAT', type: 'Oracle Fusion HCM', status: 'Warning', severity: 'warning', lastSync: '15 min ago' },
          { name: 'Dev', type: 'Oracle Fusion HCM', status: 'Healthy', severity: 'success', lastSync: '5 min ago' },
        ];

        $page.variables.activeMigrations = [
          { name: 'Q1 Payroll Flexfields', source: 'Dev', target: 'UAT', progress: 62 },
          { name: 'Security Roles Sync', source: 'UAT', target: 'Production', progress: 18 },
        ];

        $page.variables.recentJobsData = [
          { id: 'JOB-1042', migrationName: 'Lookups Baseline', source: 'Dev', target: 'UAT', objectCount: 38, status: 'SUCCESS', startedAt: '2026-05-22 08:12' },
          { id: 'JOB-1041', migrationName: 'BIP Reports Pack', source: 'Dev', target: 'UAT', objectCount: 14, status: 'FAILED', startedAt: '2026-05-22 07:45' },
          { id: 'JOB-1040', migrationName: 'Approval Groups', source: 'UAT', target: 'Production', objectCount: 7, status: 'SUCCESS', startedAt: '2026-05-21 18:30' },
          { id: 'JOB-1039', migrationName: 'DFF Config', source: 'Dev', target: 'UAT', objectCount: 22, status: 'RUNNING', startedAt: '2026-05-21 17:00' },
          { id: 'JOB-1038', migrationName: 'Profile Options', source: 'Dev', target: 'UAT', objectCount: 55, status: 'SUCCESS', startedAt: '2026-05-21 15:20' },
        ];
      } catch (err) {
        if (err && err.name === 'AbortError') return;
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to load dashboard',
          message: err.message || 'Unknown error',
          type: 'error',
          displayMode: 'persist',
        });
      } finally {
        $page.variables.isLoading = false;
      }
    }
  }

  return loadDashboardData;
});
