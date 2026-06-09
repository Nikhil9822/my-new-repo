/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  const extractModule = (path) => {
    const parts = (path || '').split('/').filter(Boolean);
    const known = ['HCM', 'ERP', 'CX', 'SCM', 'FIN', 'PRJ', 'PRC'];
    for (const p of parts) {
      if (known.includes(p.toUpperCase())) return p.toUpperCase();
    }
    return parts[1] || 'Custom';
  };

  const demoBipItems = (path) => {
    const mod = extractModule(path);
    return [
      { id: 3001, name: mod + '_PayrollDataModel',   type: 'Data Model', module: mod, status: 'Active',     lastModified: '2026-04-10', version: 'v1.0', description: 'Payroll data model (XDM)',            path: path + mod + '_PayrollDataModel.xdm' },
      { id: 3002, name: mod + '_PayrollReport',      type: 'Report',     module: mod, status: 'Active',     lastModified: '2026-04-12', version: 'v1.2', description: 'Payroll summary report (XDO)',         path: path + mod + '_PayrollReport.xdo' },
      { id: 3003, name: mod + '_HeadcountDataModel', type: 'Data Model', module: mod, status: 'Active',     lastModified: '2026-03-20', version: 'v1.0', description: 'Headcount analytics data model (XDM)', path: path + mod + '_HeadcountDataModel.xdm' },
      { id: 3004, name: mod + '_HeadcountReport',    type: 'Report',     module: mod, status: 'Active',     lastModified: '2026-03-22', version: 'v2.0', description: 'Headcount by department report (XDO)',  path: path + mod + '_HeadcountReport.xdo' },
      { id: 3005, name: mod + '_LeaveDataModel',     type: 'Data Model', module: mod, status: 'Active',     lastModified: '2026-02-15', version: 'v1.0', description: 'Leave balance data model (XDM)',        path: path + mod + '_LeaveDataModel.xdm' },
      { id: 3006, name: mod + '_LeaveBalanceReport', type: 'Report',     module: mod, status: 'Active',     lastModified: '2026-02-18', version: 'v1.1', description: 'Leave balance report (XDO)',            path: path + mod + '_LeaveBalanceReport.xdo' },
      { id: 3007, name: mod + '_GLDataModel',        type: 'Data Model', module: mod, status: 'Active',     lastModified: '2026-01-10', version: 'v1.0', description: 'GL reconciliation data model (XDM)',   path: path + mod + '_GLDataModel.xdm' },
      { id: 3008, name: mod + '_GLReconciliation',   type: 'Report',     module: mod, status: 'Deprecated', lastModified: '2025-12-01', version: 'v1.0', description: 'GL reconciliation report (XDO)',        path: path + mod + '_GLReconciliation.xdo' }
    ];
  };

  class fetchReports extends ActionChain {
    async run(context) {
      const { $page } = context;

      const dlg = document.getElementById('reportBrowseDialog')
        || document.querySelector('oj-dialog[id$="reportBrowseDialog"]');
      if (dlg && typeof dlg.close === 'function') dlg.close();

      const envId  = $page.variables.reportBrowseEnvId;
      const bipPath = ($page.variables.reportBrowsePath || '/Custom/').trim();

      $page.variables.isScanning = true;
      $page.variables.activeTab  = 'reports-tab';

      let envLabel = 'Oracle Fusion (Demo)';
      let env      = null;

      try {
        const result = await Actions.callRest(context, {
          endpoint: 'fmtAtpService/getEnvironments',
          uriParams: { limit: 100, offset: 0 }
        });
        if (result.ok && result.body && result.body.items) {
          const match = result.body.items.find(function(r) { return String(r.id) === String(envId); });
          if (match) {
            envLabel = match.name;
            env = { fusionUrl: match.fusion_url || '', username: match.username || '', password: match.password || '' };
          }
        }
      } catch (e) { /* keep default */ }

      let items = [];

      if (env && env.fusionUrl) {
        try {
          const base  = env.fusionUrl.replace(/\/$/, '');
          const url   = base + '/xmlpserver/rest/v1/catalog?path=' + encodeURIComponent(bipPath) + '&type=all&showHidden=false';
          const creds = btoa((env.username || '') + ':' + (env.password || ''));

          const resp = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': 'Basic ' + creds,
              'Accept': 'application/json'
            }
          });

          if (resp.ok) {
            const data = await resp.json();
            const raw  = data.items || data.catalogItems || [];
            items = raw
              .filter(item => /\.(xdm|xdo)$/i.test(item.name || ''))
              .map((item, idx) => ({
                id:           3000 + idx,
                name:         (item.displayName || item.name || '').replace(/\.(xdm|xdo)$/i, ''),
                type:         /\.xdm$/i.test(item.name) ? 'Data Model' : 'Report',
                module:       extractModule(item.path || bipPath),
                status:       'Active',
                lastModified: (item.modificationTime || item.lastModified || '').substring(0, 10),
                version:      item.version || 'v1.0',
                description:  (/\.xdm$/i.test(item.name) ? 'XDM' : 'XDO') + ' — ' + (item.path || bipPath + item.name),
                path:         item.path || bipPath + item.name
              }));
            $page.variables.bipApiError = '';
          } else {
            $page.variables.bipApiError = 'BIP API returned ' + resp.status + ' ' + resp.statusText + ' for ' + env.name + '. Check credentials and path.';
          }
        } catch (apiErr) {
          const msg = apiErr.message || '';
          const isCors = msg === 'Failed to fetch' || msg.includes('NetworkError') || msg.includes('CORS');
          if (isCors) {
            $page.variables.bipApiError =
              'Browser blocked the request to ' + env.fusionUrl +
              ' (CORS policy). The Fusion BIP server does not allow cross-origin requests from this app.';
          } else {
            $page.variables.bipApiError = 'BIP API error: ' + (msg || 'unknown error') + '. Demo data loaded.';
          }
          console.warn('BIP API unavailable:', msg);
        }
      }

      if (items.length === 0) {
        items = demoBipItems(bipPath);
      }

      $page.variables.objectsData        = items;
      $page.variables.filteredData       = items;
      $page.variables.filteredObjectsADP = { data: items, keyAttributes: 'id' };
      $page.variables.totalObjects       = items.length;
      $page.variables.lastScanTime       = new Date().toLocaleString();
      $page.variables.scannedEnv         = envLabel;
      $page.variables.isScanning         = false;
    }
  }
  return fetchReports;
});
