/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';

  class filterWorkbenchObjects extends ActionChain {
    async run(context, params) {
      const { $page } = context;

      // Resolve search text: try event detail first, then variable, then DOM element
      var searchVal = $page.variables.searchText || '';
      if (params && params.event) {
        var d = params.event.detail;
        if (d !== null && d !== undefined) {
          var evtVal = (d.value !== undefined && d.value !== null) ? d.value : null;
          if (evtVal !== null && typeof evtVal === 'string') {
            searchVal = evtVal;
            $page.variables.searchText = evtVal;
          }
        }
      }
      if (!searchVal) {
        var el = document.getElementById('workbenchSearch');
        if (el) {
          searchVal = el.rawValue || el.value || '';
          $page.variables.searchText = searchVal;
        }
      }

      var raw = searchVal.toLowerCase().trim();
      var statusFilter = $page.variables.statusFilter || '';

      var allData = $page.variables.objectsData;
      var result = Array.isArray(allData) ? allData : [];

      if (raw) {
        result = result.filter(function(item) {
          var fields = [
            item.name, item.type, item.folder, item.status,
            item.lastModified, item.module, item.meaning,
            item.lookupType, item.modifiedBy, item.dataModel
          ];
          for (var i = 0; i < fields.length; i++) {
            if (fields[i] && String(fields[i]).toLowerCase().indexOf(raw) >= 0) {
              return true;
            }
          }
          return false;
        });
      }

      if (statusFilter) {
        result = result.filter(function(item) { return item.status === statusFilter; });
      }

      $page.variables.filteredData = result;
      $page.variables.filteredObjectsADP = { data: result, keyAttributes: 'id' };

      $page.variables.selectedObjects = [];
      $page.variables.selectedRows = { row: { keys: [] } };
      $page.variables.selectionCount = 0;
    }
  }

  return filterWorkbenchObjects;
});
