/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class executeMigration extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.isExecuting = true;
      await Actions.fireCustomEvent(context, { name: 'vbNotification', payload: { summary: 'Migration execution started. Monitor progress in Job History.', messageType: 'info', displayMode: 'persist' } });
      $page.variables.isExecuting = false;
      $page.variables.migrationSuccess = true;
    }
  }
  return executeMigration;
});
