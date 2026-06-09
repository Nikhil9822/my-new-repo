/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class applyFilters extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const filterStatus = $page.variables.filterStatus;
      const filterPipeline = ($page.variables.searchText || '').toLowerCase();
      let filtered = $page.variables.jobsData.slice();
      if (filterStatus) {
        filtered = filtered.filter(j => j.status && j.status.toLowerCase() === filterStatus.toLowerCase());
      }
      if (filterPipeline) {
        filtered = filtered.filter(j => j.pipeline && j.pipeline.toLowerCase().includes(filterPipeline));
      }
      $page.variables.jobsData = filtered;
    }
  }
  return applyFilters;
});
