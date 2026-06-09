/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class cancelReportBrowse extends ActionChain {
    async run(context) {
      const dlg = document.getElementById('reportBrowseDialog')
        || document.querySelector('oj-dialog[id$="reportBrowseDialog"]');
      if (dlg && typeof dlg.close === 'function') dlg.close();
    }
  }
  return cancelReportBrowse;
});
