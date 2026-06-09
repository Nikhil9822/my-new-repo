/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  const TAB_TYPE_MAP = {
    'reports-tab':        ['Report', 'BIP'],
    'flexfields-tab':     ['Flexfield'],
    'lookups-tab':        ['Lookup'],
    'security-roles-tab': ['Security Role'],
    'profiles-tab':       ['Profile'],
    'workflows-tab':      ['Workflow'],
    'integrations-tab':   ['Integration'],
    'notifications-tab':  ['Notification'],
    'translations-tab':   ['Translation'],
    'custom-objects-tab': ['Custom Object'],
    'dff-tab':            ['DFF'],
    'value-sets-tab':     ['Value Set'],
    'trees-tab':          ['Tree'],
    'approval-groups-tab':['Approval Group'],
    'doc-sequences-tab':  ['Doc Sequence'],
    'profile-options-tab':['Profile Option'],
    'eff-tab':            ['Ext Flexfield'],
    'page-composer-tab':  ['Page']
  };

  const SCAN_DATA = [
    { id: 1,  name: 'GlobalHR_Payroll_Report',   type: 'Report',        module: 'HCM', status: 'Active',     lastModified: '2026-05-10', version: 'v1.3.2', description: 'Payroll summary report' },
    { id: 2,  name: 'Employee_360_Dashboard',     type: 'Dashboard',     module: 'HCM', status: 'Active',     lastModified: '2026-04-28', version: 'v2.1.0', description: 'Employee overview dashboard' },
    { id: 3,  name: 'AP_Invoice_Workflow',        type: 'Workflow',      module: 'ERP', status: 'Active',     lastModified: '2026-05-01', version: 'v1.0.5', description: 'AP invoice approval workflow' },
    { id: 4,  name: 'Customer_360_View',          type: 'Page',          module: 'CX',  status: 'Modified',   lastModified: '2026-05-15', version: 'v3.0.0', description: 'Customer 360 view page' },
    { id: 5,  name: 'Payroll_Integration',        type: 'Integration',   module: 'HCM', status: 'Active',     lastModified: '2026-03-20', version: 'v1.1.0', description: 'Payroll third-party integration' },
    { id: 6,  name: 'Leave_Balance_Report',       type: 'Report',        module: 'HCM', status: 'Active',     lastModified: '2026-04-15', version: 'v1.0.2', description: 'Leave balance report' },
    { id: 7,  name: 'GL_Reconciliation_Report',   type: 'Report',        module: 'ERP', status: 'Deprecated', lastModified: '2025-12-01', version: 'v1.0.0', description: 'GL reconciliation report' },
    { id: 8,  name: 'Workforce_Analytics',        type: 'Dashboard',     module: 'HCM', status: 'Active',     lastModified: '2026-05-18', version: 'v2.0.1', description: 'Workforce analytics dashboard' },
    { id: 9,  name: 'Expense_Report_Template',    type: 'Report',        module: 'ERP', status: 'Active',     lastModified: '2026-05-12', version: 'v1.2.0', description: 'Expense claim report template' },
    { id: 10, name: 'Territory_Lookup',           type: 'Lookup',        module: 'CX',  status: 'Active',     lastModified: '2026-04-20', version: 'v1.0.0', description: 'Sales territory lookup codes' },
    { id: 11, name: 'Job_Grade_Flexfield',        type: 'Flexfield',     module: 'HCM', status: 'Active',     lastModified: '2026-03-15', version: 'v2.0.0', description: 'Job grade descriptive flexfield' },
    { id: 12, name: 'Approval_Matrix_Workflow',   type: 'Workflow',      module: 'ERP', status: 'Active',     lastModified: '2026-05-05', version: 'v1.4.0', description: 'Procurement approval matrix' },
    { id: 13, name: 'Headcount_By_Dept_Report',   type: 'Report',        module: 'HCM', status: 'Active',     lastModified: '2026-05-08', version: 'v1.1.0', description: 'Headcount by department' },
    { id: 14, name: 'Order_Status_Integration',   type: 'Integration',   module: 'SCM', status: 'Active',     lastModified: '2026-04-30', version: 'v2.0.0', description: 'Order status integration' },
    { id: 15, name: 'Country_ValueSet',           type: 'Value Set',     module: 'ERP', status: 'Active',     lastModified: '2026-02-10', version: 'v1.0.0', description: 'Country value set' }
  ];

  class confirmScan extends ActionChain {
    async run(context) {
      const { $page } = context;

      const dlg = document.getElementById('scanEnvDialog')
        || document.querySelector('oj-dialog[id$="scanEnvDialog"]');
      if (dlg && typeof dlg.close === 'function') dlg.close();

      if (!$page.variables.scanEnvId) return;

      $page.variables.isScanning = true;

      // Resolve env display name from ATP
      let envLabel = 'Oracle Fusion';
      try {
        const result = await Actions.callRest(context, {
          endpoint: 'fmtAtpService/getEnvironments',
          uriParams: { limit: 100, offset: 0 }
        });
        if (result.ok && result.body && result.body.items) {
          const match = result.body.items.find(function(r) { return String(r.id) === String($page.variables.scanEnvId); });
          if (match) envLabel = match.name;
        }
      } catch (e) { /* use default */ }

      $page.variables.scannedEnv  = envLabel;
      $page.variables.objectsData = SCAN_DATA;

      // Apply current tab + module + search filters so table reflects active state
      const tabTypes     = TAB_TYPE_MAP[$page.variables.activeTab];
      const filterModule = $page.variables.filterEnv;
      const raw          = ($page.variables.searchText || '').toLowerCase().trim();

      let result = SCAN_DATA;
      if (tabTypes && tabTypes.length) {
        result = result.filter(item => tabTypes.includes(item.type));
      }
      if (filterModule && filterModule !== 'all') {
        result = result.filter(item => item.module === filterModule);
      }
      if (raw) {
        result = result.filter(item =>
          (item.name        && item.name.toLowerCase().includes(raw))        ||
          (item.type        && item.type.toLowerCase().includes(raw))        ||
          (item.module      && item.module.toLowerCase().includes(raw))      ||
          (item.status      && item.status.toLowerCase().includes(raw))      ||
          (item.description && item.description.toLowerCase().includes(raw)) ||
          (item.version     && item.version.toLowerCase().includes(raw))
        );
      }

      $page.variables.filteredData       = result;
      $page.variables.filteredObjectsADP = { data: result, keyAttributes: 'id' };
      $page.variables.totalObjects = SCAN_DATA.length;
      $page.variables.lastScanTime = new Date().toLocaleString();
      $page.variables.isScanning   = false;
    }
  }
  return confirmScan;
});
