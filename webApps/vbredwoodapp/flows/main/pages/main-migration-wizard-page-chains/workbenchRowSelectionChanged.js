/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';

  class workbenchRowSelectionChanged extends ActionChain {
    async run(context) {
      const { $page } = context;

      const keys =
        $page.variables.selectedRows &&
        $page.variables.selectedRows.row &&
        $page.variables.selectedRows.row.keys
          ? [...$page.variables.selectedRows.row.keys]
          : [];

      $page.variables.selectedObjects = keys.map(k => String(k));
      $page.variables.selectionCount = keys.length;
    }
  }

  return workbenchRowSelectionChanged;
});
