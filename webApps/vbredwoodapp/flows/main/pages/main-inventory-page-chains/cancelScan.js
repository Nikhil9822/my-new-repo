/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class cancelScan extends ActionChain {
    async run(context) {
      const dlg = document.getElementById('scanEnvDialog')
        || document.querySelector('oj-dialog[id$="scanEnvDialog"]');
      if (dlg && typeof dlg.close === 'function') dlg.close();
    }
  }
  return cancelScan;
});
