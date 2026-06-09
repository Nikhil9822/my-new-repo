/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class loadEnvironments extends ActionChain {
    async run(context) {
      const { $page } = context;
      $page.variables.isLoading = true;

      try {
        const result = await Actions.callRest(context, {
          endpoint: 'fmtAtpService/getEnvironments',
          uriParams: { limit: 100, offset: 0 }
        });

        if (result.ok) {
          const rows = (result.body && result.body.items) ? result.body.items : [];
          const envs = rows.map(function(r) {
            return {
              id:           r.id,
              name:         r.name          || '',
              description:  r.description   || '',
              type:         r.env_type      || 'oracle_fusion',
              status:       r.status        || 'Connected',
              statusSeverity: r.status === 'Connected' ? 'success' : 'error',
              fusionUrl:    r.fusion_url    || '',
              authMethod:   r.auth_method   || 'basic',
              username:     r.username      || '',
              password:     r.password      || '',
              clientId:     r.client_id     || '',
              clientSecret: r.client_secret || '',
              tokenUrl:     r.token_url     || ''
            };
          });
          $page.variables.environments = envs;
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Load Failed',
            message: 'Could not load environments from ATP (HTTP ' + result.status + ')',
            severity: 'error'
          });
        }
      } catch (e) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Connection Error',
          message: 'Could not reach ATP service. Check your service connection configuration.',
          severity: 'error'
        });
      } finally {
        $page.variables.isLoading = false;
      }
    }
  }

  return loadEnvironments;
});
