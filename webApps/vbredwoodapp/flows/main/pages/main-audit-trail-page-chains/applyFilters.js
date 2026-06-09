/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class applyFilters extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const filterUser = ($page.variables.filterUser || '').toLowerCase();
      const filterAction = ($page.variables.filterAction || '').toLowerCase();
      const searchText = ($page.variables.searchText || '').toLowerCase();
      const allLogs = $page.variables.auditData || [];

      const filtered = allLogs.filter(log => {
        const matchUser = !filterUser || (log.user && log.user.toLowerCase().includes(filterUser));
        const matchAction = !filterAction || (log.action && log.action.toLowerCase().includes(filterAction));
        const matchSearch = !searchText ||
          (log.user && log.user.toLowerCase().includes(searchText)) ||
          (log.action && log.action.toLowerCase().includes(searchText)) ||
          (log.resource && log.resource.toLowerCase().includes(searchText)) ||
          (log.details && log.details.toLowerCase().includes(searchText));
        return matchUser && matchAction && matchSearch;
      });

      $page.variables.auditData = filtered;
      $page.variables.totalRecords = filtered.length;
    }
  }
  return applyFilters;
});
