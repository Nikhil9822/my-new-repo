/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';

  class clearWorkbenchFilters extends ActionChain {
    async run(context) {
      const { $page } = context;

      $page.variables.searchText = '';
      $page.variables.statusFilter = '';
      $page.variables.filter1Value = '';
      $page.variables.filter2Value = '';

      const all = $page.variables.objectsData;
      $page.variables.filteredData = all;
      $page.variables.filteredObjectsADP = { data: all, keyAttributes: 'id' };
    }
  }

  return clearWorkbenchFilters;
});
