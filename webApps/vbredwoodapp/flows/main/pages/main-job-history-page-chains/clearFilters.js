/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class clearFilters extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.filterStatus = null;
      $page.variables.filterEnv = null;
      $page.variables.filterDateRange = null;
      $page.variables.searchText = '';
    }
  }
  return clearFilters;
});
