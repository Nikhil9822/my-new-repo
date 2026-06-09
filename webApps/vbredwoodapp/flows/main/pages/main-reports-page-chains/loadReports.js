/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class loadReports extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.isLoading = true;
      try {
        // Trend chart: groups = months, series = successful + failed
        $page.variables.trendGroups = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
        $page.variables.trendSeries = [
          { name: 'Successful', items: [45, 52, 38, 61, 48] },
          { name: 'Failed', items: [2, 1, 4, 0, 3] }
        ];

        // Type distribution chart: groups = labels, series = values
        $page.variables.typeGroups = ['Reports', 'Dashboards', 'Workflows', 'Pages', 'Integrations'];
        $page.variables.typeSeries = [
          { name: 'Count', items: [35, 22, 18, 14, 11] }
        ];

        // Status chart: groups = envs, series = pushes
        $page.variables.statusGroups = ['Production HCM', 'UAT HCM', 'Dev ERP', 'Production ERP'];
        $page.variables.statusSeries = [
          { name: 'Pushes', items: [12, 28, 8, 15] }
        ];

        // Summary metrics table
        $page.variables.metricsData = [
          { environment: 'Total Migrations', value: 244 },
          { environment: 'Success Rate', value: '97.5%' },
          { environment: 'Avg Duration', value: '3m 12s' },
          { environment: 'Objects Migrated', value: 1847 }
        ];
      } catch (e) {
        await Actions.fireCustomEvent(context, {
          name: 'vbNotification',
          payload: { summary: 'Failed to load reports data', messageType: 'error', displayMode: 'transient' }
        });
      } finally {
        $page.variables.isLoading = false;
      }
    }
  }
  return loadReports;
});
