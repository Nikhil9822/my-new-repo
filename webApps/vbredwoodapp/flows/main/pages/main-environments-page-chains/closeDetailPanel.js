/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class closeDetailPanel extends ActionChain {
    async run(context) {
      const { $page } = context;
      $page.variables.connectionTestResult = {};
      const dlg = document.getElementById('envDetailDialog')
        || document.querySelector('oj-dialog[id$="envDetailDialog"]');
      if (dlg && typeof dlg.close === 'function') dlg.close();
    }
  }
  return closeDetailPanel;
});
