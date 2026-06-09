/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class cancelDeleteEnv extends ActionChain {
    async run(context) {
      const dlg = document.getElementById('deleteEnvDialog')
        || document.querySelector('oj-dialog[id$="deleteEnvDialog"]');
      if (dlg && typeof dlg.close === 'function') dlg.close();
    }
  }
  return cancelDeleteEnv;
});
