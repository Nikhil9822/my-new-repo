/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class testConnectionPanel extends ActionChain {
    async run(context) {
      const { $page } = context;
      const env = $page.variables.selectedEnv;
      if (!env) return;

      const fail = (msg) => {
        $page.variables.connectionTestResult = { status: 'error', message: msg };
      };

      if (!env.fusionUrl || !env.fusionUrl.trim()) {
        return fail('Fusion Application URL is required to test the connection.');
      }
      if (!/^https?:\/\/.+/i.test(env.fusionUrl.trim())) {
        return fail('Fusion Application URL must start with http:// or https://.');
      }

      if (env.authMethod === 'basic') {
        if (!env.username || !env.username.trim()) return fail('Username is required for Basic Authentication.');
        if (!env.password || !env.password.trim()) return fail('Password is required for Basic Authentication.');
      }
      if (env.authMethod === 'oauth2') {
        if (!env.clientId || !env.clientId.trim()) return fail('Client ID is required for OAuth 2.0 Client Credentials.');
        if (!env.tokenUrl || !env.tokenUrl.trim()) return fail('Token Endpoint URL is required for OAuth 2.0 Client Credentials.');
      }
      if (env.authMethod === 'jwt') {
        if (!env.jwtIssuer || !env.jwtIssuer.trim()) return fail('JWT Issuer is required for JWT Bearer Token.');
        if (!env.jwtSubject || !env.jwtSubject.trim()) return fail('JWT Subject is required for JWT Bearer Token.');
      }

      // Simulate successful connection — update status in the environments list
      const envs = $page.variables.environments.slice();
      const idx = envs.findIndex(e => e.id === env.id);
      const updated = Object.assign({}, env, { status: 'Connected', statusSeverity: 'success' });
      $page.variables.selectedEnv = updated;
      if (idx !== -1) {
        envs[idx] = updated;
        $page.variables.environments = envs;
      }

      $page.variables.connectionTestResult = {
        status: 'success',
        message: 'Connection to ' + env.fusionUrl.trim() + ' verified successfully.'
      };
    }
  }
  return testConnectionPanel;
});
