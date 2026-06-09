/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class loadJobs extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      try {
        $page.variables.isLoading = true;
        $page.variables.jobsData = [
          { id: 1001, pipeline: 'HCM Full Migration', status: 'Success', startTime: '2026-05-18 09:30:00', endTime: '2026-05-18 09:34:22', duration: '4m 22s', objectsMigrated: 45, objectsFailed: 0, source: 'UAT HCM', target: 'Production HCM', triggeredBy: 'Scheduled' },
          { id: 1002, pipeline: 'ERP Reports Sync', status: 'Success', startTime: '2026-05-17 14:00:00', endTime: '2026-05-17 14:01:05', duration: '1m 05s', objectsMigrated: 12, objectsFailed: 0, source: 'UAT ERP', target: 'Production ERP', triggeredBy: 'Scheduled' },
          { id: 1003, pipeline: 'CX Pages Deploy', status: 'Failed', startTime: '2026-05-10 11:00:00', endTime: '2026-05-10 11:02:18', duration: '2m 18s', objectsMigrated: 6, objectsFailed: 2, source: 'Dev CX', target: 'UAT CX', triggeredBy: 'Manual - Dinesh N' },
          { id: 1004, pipeline: 'Dev-to-UAT Nightly', status: 'Success', startTime: '2026-05-19 01:00:00', endTime: '2026-05-19 01:08:45', duration: '8m 45s', objectsMigrated: 30, objectsFailed: 0, source: 'Dev', target: 'UAT', triggeredBy: 'Scheduled' },
          { id: 1005, pipeline: 'HCM Full Migration', status: 'Running', startTime: '2026-05-19 09:30:00', endTime: null, duration: '—', objectsMigrated: 0, objectsFailed: 0, source: 'UAT HCM', target: 'Production HCM', triggeredBy: 'Scheduled' }
        ];
        $page.variables.totalJobs = $page.variables.jobsData.length;
        $page.variables.isLoading = false;
      } catch (e) {
        $page.variables.isLoading = false;
        await Actions.fireCustomEvent(context, { name: 'vbNotification', payload: { summary: 'Failed to load job history. Please try again.', messageType: 'error', displayMode: 'transient' } });
      }
    }
  }
  return loadJobs;
});
