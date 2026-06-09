/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class loadPipelines extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.isLoading = true;
      $page.variables.pipelines = [
        { id: 1, name: 'HCM Full Migration', description: 'Full HCM object migration to Production', status: 'Active', lastRun: '2026-05-18 09:30', nextRun: '2026-05-25 09:00', objectCount: 45, schedule: 'Weekly' },
        { id: 2, name: 'ERP Reports Sync', description: 'Sync ERP reports from UAT to Production', status: 'Active', lastRun: '2026-05-17 14:00', nextRun: '2026-05-20 14:00', objectCount: 12, schedule: 'Daily' },
        { id: 3, name: 'CX Pages Deploy', description: 'Deploy CX UI pages to all environments', status: 'Paused', lastRun: '2026-05-10 11:00', nextRun: null, objectCount: 8, schedule: 'Manual' },
        { id: 4, name: 'Dev-to-UAT Nightly', description: 'Nightly sync from Dev to UAT', status: 'Active', lastRun: '2026-05-19 01:00', nextRun: '2026-05-20 01:00', objectCount: 30, schedule: 'Nightly' }
      ];
      $page.variables.pipelineRunsData = [
        { id: 101, pipelineId: 1, status: 'Success', startTime: '2026-05-18 09:30', duration: '4m 22s', objectsMigrated: 45, objectsFailed: 0 },
        { id: 102, pipelineId: 1, status: 'AWAITING_APPROVAL', startTime: '2026-05-11 09:30', duration: '—', objectsMigrated: 0, objectsFailed: 0 },
        { id: 103, pipelineId: 2, status: 'Success', startTime: '2026-05-17 14:00', duration: '1m 05s', objectsMigrated: 12, objectsFailed: 0 },
        { id: 104, pipelineId: 3, status: 'Failed', startTime: '2026-05-10 11:00', duration: '2m 18s', objectsMigrated: 6, objectsFailed: 2 }
      ];
      $page.variables.isLoading = false;
    }
  }
  return loadPipelines;
});
