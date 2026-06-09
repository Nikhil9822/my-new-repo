/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class loadWorkbench extends ActionChain {
    async run(context) {
      const { $page } = context;

      // Load environments from ATP via service connection
      let envOptions = [{ value: 'demo', label: 'Oracle Fusion (Demo)' }];
      try {
        const result = await Actions.callRest(context, {
          endpoint: 'fmtAtpService/getEnvironments',
          uriParams: { limit: 100, offset: 0 }
        });
        if (result.ok && result.body && result.body.items && result.body.items.length > 0) {
          envOptions = result.body.items.map(function(r) {
            return {
              value:     String(r.id),
              label:     r.name || r.fusion_url || String(r.id),
              fusionUrl: r.fusion_url    || '',
              authMethod: r.auth_method  || 'basic',
              username:  r.username      || '',
              password:  r.password      || ''
            };
          });
        }
      } catch (e) { /* fallback to demo if ATP unreachable */ }

      $page.variables.availableEnvsADP = { data: envOptions, keyAttributes: 'value' };
      if (envOptions.length > 0) {
        $page.variables.sourceEnvId    = envOptions[0].value;
        $page.variables.sourceEnvLabel = envOptions[0].label;
      }
      if (envOptions.length > 1) {
        $page.variables.targetEnvId    = envOptions[1].value;
        $page.variables.targetEnvLabel = envOptions[1].label;
      }

      // Init BIP type (default selected tab)
      const typeDef = $page.functions.getTypeDef('bip');
      $page.variables.tableColumns    = typeDef.columns;
      $page.variables.currentTypeLabel = typeDef.label;
      $page.variables.filter1Label    = typeDef.filter1.label;
      $page.variables.filter1ADP      = { data: typeDef.filter1.options, keyAttributes: 'value' };
      $page.variables.filter2Label    = typeDef.filter2.label;
      $page.variables.filter2ADP      = { data: typeDef.filter2.options, keyAttributes: 'value' };

      $page.variables.isLoading = false;
    }
  }

  return loadWorkbench;
});
