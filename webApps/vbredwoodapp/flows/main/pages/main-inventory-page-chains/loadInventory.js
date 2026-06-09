/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  const SAMPLE_DATA = [
    { id: 1, name: 'GlobalHR_Payroll_Report',  type: 'Report',      module: 'HCM', status: 'Active',     lastModified: '2026-05-10', version: 'v1.3.2', description: 'Payroll summary report' },
    { id: 2, name: 'Employee_360_Dashboard',   type: 'Dashboard',   module: 'HCM', status: 'Active',     lastModified: '2026-04-28', version: 'v2.1.0', description: 'Employee overview dashboard' },
    { id: 3, name: 'AP_Invoice_Workflow',      type: 'Workflow',    module: 'ERP', status: 'Active',     lastModified: '2026-05-01', version: 'v1.0.5', description: 'AP invoice approval workflow' },
    { id: 4, name: 'Customer_360_View',        type: 'Page',        module: 'CX',  status: 'Modified',   lastModified: '2026-05-15', version: 'v3.0.0', description: 'Customer 360 view page' },
    { id: 5, name: 'Payroll_Integration',      type: 'Integration', module: 'HCM', status: 'Active',     lastModified: '2026-03-20', version: 'v1.1.0', description: 'Payroll third-party integration' },
    { id: 6, name: 'Leave_Balance_Report',     type: 'Report',      module: 'HCM', status: 'Active',     lastModified: '2026-04-15', version: 'v1.0.2', description: 'Leave balance report' },
    { id: 7, name: 'GL_Reconciliation_Report', type: 'Report',      module: 'ERP', status: 'Deprecated', lastModified: '2025-12-01', version: 'v1.0.0', description: 'GL reconciliation report' },
    { id: 8, name: 'Workforce_Analytics',      type: 'Dashboard',   module: 'HCM', status: 'Active',     lastModified: '2026-05-18', version: 'v2.0.1', description: 'Workforce analytics dashboard' }
  ];

  class loadInventory extends ActionChain {
    async run(context) {
      const { $page } = context;
      $page.variables.isLoading = true;
      try {
        $page.variables.objectsData        = SAMPLE_DATA;
        $page.variables.filteredData       = SAMPLE_DATA;
        $page.variables.filteredObjectsADP = { data: SAMPLE_DATA, keyAttributes: 'id' };
        $page.variables.totalObjects = SAMPLE_DATA.length;
        $page.variables.lastScanTime = 'Demo data — click Scan Now to scan a real environment';
        $page.variables.scannedEnv   = 'Oracle Fusion (Demo)';

        // Pre-load environments from ATP
        try {
          const result = await Actions.callRest(context, {
            endpoint: 'fmtAtpService/getEnvironments',
            uriParams: { limit: 100, offset: 0 }
          });
          const envs = (result.ok && result.body && result.body.items) ? result.body.items : [];
          const opts = envs.length > 0
            ? envs.map(function(r) { return { value: String(r.id), label: r.name + (r.fusion_url ? '  —  ' + r.fusion_url : '') }; })
            : [{ value: 'demo', label: 'Oracle Fusion (Demo)' }];
          $page.variables.availableEnvsADP = { data: opts, keyAttributes: 'value' };
          $page.variables.scanEnvId        = opts[0].value;
        } catch (e) {
          // keep default
        }
      } catch (e) {
        console.error('loadInventory failed:', e);
      } finally {
        $page.variables.isLoading = false;
      }
    }
  }
  return loadInventory;
});
