/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class testConnection extends ActionChain {
    async run(context) {
      const { $page } = context;
      const env = $page.variables.selectedEnv;
      if (!env) return;

      if (!env.fusionUrl || !env.fusionUrl.trim()) return;

      const urlPattern = /^https?:\/\/.+/i;
      if (!urlPattern.test(env.fusionUrl.trim())) return;

      if (env.authMethod === 'basic') {
        if (!env.username || !env.username.trim()) return;
        if (!env.password || !env.password.trim()) return;
      }
      if (env.authMethod === 'oauth2') {
        if (!env.clientId || !env.tokenUrl) return;
      }
      if (env.authMethod === 'jwt') {
        if (!env.jwtIssuer || !env.jwtSubject) return;
      }

      const envs = $page.variables.environments.slice();
      const idx = envs.findIndex(e => e.id === env.id);
      const updatedEnv = Object.assign({}, env, { status: 'Connected', statusSeverity: 'success' });
      $page.variables.selectedEnv = updatedEnv;
      if (idx !== -1) {
        envs[idx] = updatedEnv;
        $page.variables.environments = envs;
      }
    }
  }
  return testConnection;
});
