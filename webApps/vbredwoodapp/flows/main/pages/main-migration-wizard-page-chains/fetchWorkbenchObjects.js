/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class fetchWorkbenchObjects extends ActionChain {
    async run(context) {
      const { $page } = context;

      $page.variables.isFetching = true;
      $page.variables.bipApiError = '';

      await new Promise(function(resolve) { setTimeout(resolve, 600); });

      try {
        const typeKey = $page.variables.selectedObjectType || 'bip';

        if (typeKey === 'bip') {
          const rawPath = $page.variables.bipReportPath || '/Custom/';
          const base    = rawPath.replace(/\/$/, '');
          const parts   = base.split('/');
          let prefix    = 'Custom';
          for (let i = parts.length - 1; i >= 0; i--) {
            if (parts[i]) { prefix = parts[i]; break; }
          }

          const files = [
            { id: 'f1', name: prefix + '_SalesReport.xdo',          type: 'Report',     folder: base, status: 'Active',   lastModified: '2026-04-10' },
            { id: 'f2', name: prefix + '_InventoryReport.xdo',      type: 'Report',     folder: base, status: 'Active',   lastModified: '2026-03-22' },
            { id: 'f3', name: prefix + '_ServiceSummary.xdo',       type: 'Report',     folder: base, status: 'Active',   lastModified: '2026-02-15' },
            { id: 'f4', name: prefix + '_MainDataModel.xdm',        type: 'Data Model', folder: base, status: 'Active',   lastModified: '2026-04-01' },
            { id: 'f5', name: prefix + '_DetailsDataModel.xdm',     type: 'Data Model', folder: base, status: 'Active',   lastModified: '2026-01-30' },
            { id: 'f6', name: prefix + '_PurchaseOrderReport.xdo',  type: 'Report',     folder: base, status: 'Inactive', lastModified: '2025-12-14' },
            { id: 'f7', name: prefix + '_VendorPaymentsReport.xdo', type: 'Report',     folder: base, status: 'Active',   lastModified: '2026-01-19' },
            { id: 'f8', name: prefix + '_AssetRegister.xdm',        type: 'Data Model', folder: base, status: 'Draft',    lastModified: '2026-02-05' }
          ];

          $page.variables.objectsData       = files;
          $page.variables.filteredData      = files;
          $page.variables.filteredObjectsADP = { data: files, keyAttributes: 'id' };

        } else {
          const sample = $page.functions.getSample(typeKey);
          $page.variables.objectsData       = sample;
          $page.variables.filteredData      = sample;
          $page.variables.filteredObjectsADP = { data: sample, keyAttributes: 'id' };
        }

        $page.variables.selectedObjects = [];
        $page.variables.selectedRows    = { row: { keys: [] } };
        $page.variables.selectionCount  = 0;
        $page.variables.searchText      = '';
        $page.variables.statusFilter    = '';

      } finally {
        $page.variables.isFetching = false;
      }
    }
  }

  return fetchWorkbenchObjects;
});
