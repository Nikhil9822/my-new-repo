/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';

  const STORAGE_KEY = 'fmt_environments';

  class saveAndClosePanel extends ActionChain {
    async run(context) {
      const { $page } = context;
      const envs = $page.variables.environments.slice();
      const idx = envs.findIndex(e => e.id === $page.variables.selectedEnv.id);
      if (idx !== -1) {
        envs[idx] = $page.variables.selectedEnv;
      } else {
        envs.push($page.variables.selectedEnv);
      }
      $page.variables.environments = envs;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(envs)); } catch(e) {}
      $page.variables.connectionTestResult = {};
      const dlg = document.getElementById('envDetailDialog')
        || document.querySelector('oj-dialog[id$="envDetailDialog"]');
      if (dlg && typeof dlg.close === 'function') dlg.close();
    }
  }
  return saveAndClosePanel;
});
