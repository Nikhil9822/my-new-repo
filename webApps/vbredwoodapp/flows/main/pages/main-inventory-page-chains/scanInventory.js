/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class scanInventory extends ActionChain {
    async run(context) {
      const { $page } = context;

      // Refresh env list from ATP in case user added connections since page loaded
      try {
        const result = await Actions.callRest(context, {
          endpoint: 'fmtAtpService/getEnvironments',
          uriParams: { limit: 100, offset: 0 }
        });
        const envs = (result.ok && result.body && result.body.items) ? result.body.items : [];
        const opts = envs.length > 0
          ? envs.map(function(r) { return { value: String(r.id), label: r.name + (r.fusion_url ? '  —  ' + r.fusion_url : '') }; })
          : [{ value: 'demo', label: 'Oracle Fusion (Demo)' }];
        $page.variables.availableEnvsADP = { data: opts, keyAttributes: 'value' };
        $page.variables.scanEnvId        = opts[0].value;
      } catch (e) {
        // keep whatever is already in availableEnvs
      }

      const dlg = document.getElementById('scanEnvDialog')
        || document.querySelector('oj-dialog[id$="scanEnvDialog"]');
      if (dlg && typeof dlg.open === 'function') dlg.open();
    }
  }
  return scanInventory;
});
