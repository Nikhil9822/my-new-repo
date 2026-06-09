/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class closeDetailDrawer extends ActionChain {
    async run(context) {
      const dlg = document.getElementById('objectDetailDialog')
        || document.querySelector('oj-dialog[id$="objectDetailDialog"]');
      if (dlg && typeof dlg.close === 'function') dlg.close();
    }
  }
  return closeDetailDrawer;
});
