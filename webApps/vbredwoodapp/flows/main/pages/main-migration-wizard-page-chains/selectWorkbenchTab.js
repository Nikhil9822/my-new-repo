/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';

  class selectWorkbenchTab extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;

      // Traverse DOM to find the element carrying data-type-key
      let el = event.currentTarget || event.target;
      let typeKey = null;
      while (el && !typeKey) {
        typeKey = el.getAttribute ? el.getAttribute('data-type-key') : null;
        el = el.parentElement;
      }
      if (!typeKey) return;

      // Update selected type chip
      $page.variables.selectedObjectType = typeKey;

      // Load type definition from page module
      const typeDef = $page.functions.getTypeDef(typeKey);
      if (!typeDef) return;

      $page.variables.currentTypeLabel = typeDef.label;
      $page.variables.tableColumns = typeDef.columns;
      $page.variables.filter1Label = typeDef.filter1.label;
      $page.variables.filter1ADP = { data: typeDef.filter1.options, keyAttributes: 'value' };
      $page.variables.filter2Label = typeDef.filter2.label;
      $page.variables.filter2ADP = { data: typeDef.filter2.options, keyAttributes: 'value' };

      // Reset filter values for new type
      $page.variables.filter1Value = '';
      $page.variables.filter2Value = '';

      // Clear table data and selection — user must click Fetch
      $page.variables.objectsData = [];
      $page.variables.filteredData = [];
      $page.variables.filteredObjectsADP = { data: [], keyAttributes: 'id' };
      $page.variables.selectedObjects = [];
      $page.variables.selectedRows = { row: { keys: [] } };
      $page.variables.selectionCount = 0;
      $page.variables.searchText = '';
      $page.variables.statusFilter = '';
    }
  }

  return selectWorkbenchTab;
});
