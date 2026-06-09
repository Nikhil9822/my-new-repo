/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class rowSelectionChanged extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      const value = event.detail.value;
      $page.variables.selectedRows = value || { row: { keys: [] } };
      const keys = value && value.row && value.row.keys;
      $page.variables.selectedObjects = keys instanceof Set
        ? Array.from(keys).map(String)
        : (Array.isArray(keys) ? keys.map(String) : []);
    }
  }
  return rowSelectionChanged;
});
