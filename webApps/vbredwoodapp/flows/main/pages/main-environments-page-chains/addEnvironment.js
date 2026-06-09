/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class addEnvironment extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.selectedEnv = {
        id: Date.now(),
        name: '',
        description: '',
        type: 'hcm',
        fusionUrl: '',
        authMethod: 'basic',
        username: '',
        password: '',
        clientId: '',
        clientSecret: '',
        tokenUrl: '',
        jwtIssuer: '',
        jwtSubject: '',
        storageProvider: 'none',
        ociNamespace: '',
        ociBucket: '',
        ociRegion: '',
        gitRepoUrl: '',
        gitBranch: 'main',
        gitToken: '',
        status: 'Not Tested',
        statusSeverity: 'neutral'
      };
    }
  }
  return addEnvironment;
});
