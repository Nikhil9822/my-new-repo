/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class selectEnvironment extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      const envs = $page.variables.environments;
      if (!envs || !envs.length) return;

      let match = null;

      // Primary: match clicked card by DOM position — avoids broken data-attr binding in VBCS templates
      try {
        const cards = Array.from(document.querySelectorAll('.fmt-env-list-item'));
        let el = event && (event.currentTarget || event.target);
        while (el && !el.classList.contains('fmt-env-list-item')) {
          el = el.parentElement;
        }
        if (el) {
          const idx = cards.indexOf(el);
          if (idx >= 0 && idx < envs.length) {
            match = envs[idx];
          }
        }
      } catch (e) {}

      // Fallback: try dataset.envId (works in some VBCS versions)
      if (!match) {
        try {
          const envId = parseInt(event.currentTarget.dataset.envId, 10);
          if (!isNaN(envId)) {
            match = envs.find(env => env.id === envId || String(env.id) === String(envId));
          }
        } catch (e) {}
      }

      if (!match) return;

      $page.variables.selectedEnv = JSON.parse(JSON.stringify(match));
      $page.variables.connectionTestResult = {};

      const dlg = document.getElementById('envDetailDialog')
        || document.querySelector('oj-dialog[id$="envDetailDialog"]');
      if (dlg && typeof dlg.open === 'function') dlg.open();
    }
  }
  return selectEnvironment;
});
