/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class viewObjectDetail extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      let rowData = null;

      // oj-row-action event: event.detail.context.item.data
      try { rowData = event.detail.context.item.data; } catch (e) {}

      if (!rowData) return;

      $page.variables.selectedObjectDetail = rowData;
      const dlg = document.getElementById('objectDetailDialog')
        || document.querySelector('oj-dialog[id$="objectDetailDialog"]');
      if (dlg && typeof dlg.open === 'function') dlg.open();
    }
  }
  return viewObjectDetail;
});
