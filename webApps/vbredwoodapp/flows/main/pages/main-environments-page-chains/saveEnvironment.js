/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain', 'vb/action/actions'], (ActionChain, Actions) => {
  'use strict';

  class saveEnvironment extends ActionChain {
    async run(context) {
      const { $page } = context;
      const env = $page.variables.selectedEnv;

      const payload = {
        name:          env.name         || '',
        description:   env.description  || '',
        env_type:      env.type         || 'oracle_fusion',
        status:        env.status       || 'Connected',
        fusion_url:    env.fusionUrl    || '',
        auth_method:   env.authMethod   || 'basic',
        username:      env.username     || '',
        password:      env.password     || '',
        client_id:     env.clientId     || '',
        client_secret: env.clientSecret || '',
        token_url:     env.tokenUrl     || ''
      };

      try {
        let result;
        if (env.id) {
          // Update existing record
          result = await Actions.callRest(context, {
            endpoint: 'fmtAtpService/updateEnvironment',
            uriParams: { id: env.id },
            body: payload
          });
        } else {
          // Create new record
          result = await Actions.callRest(context, {
            endpoint: 'fmtAtpService/createEnvironment',
            body: payload
          });
        }

        if (result.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Environment "' + env.name + '" saved successfully.',
            severity: 'confirmation'
          });
          // Reload the list
          await Actions.invokeActionChain(context, { chain: 'loadEnvironments' });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Save Failed',
            message: 'Could not save environment (HTTP ' + result.status + ')',
            severity: 'error'
          });
        }
      } catch (e) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Connection Error',
          message: 'Could not reach ATP service: ' + (e && e.message ? e.message : 'unknown error'),
          severity: 'error'
        });
      }
    }
  }

  return saveEnvironment;
});
