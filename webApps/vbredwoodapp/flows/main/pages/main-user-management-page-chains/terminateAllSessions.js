/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class terminateAllSessions extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.sessionsData = [];
      await Actions.fireCustomEvent(context, {
        name: 'vbNotification',
        payload: { summary: 'All sessions terminated', messageType: 'confirmation', displayMode: 'transient' }
      });
    }
  }
  return terminateAllSessions;
});
