/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class rejectRun extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      await Actions.fireCustomEvent(context, { name: 'vbNotification', payload: { summary: 'Run rejected and cancelled.', messageType: 'info', displayMode: 'transient' } });
      if ($page.variables.activeRun) {
        $page.variables.activeRun = Object.assign({}, $page.variables.activeRun, { status: 'Cancelled' });
      }
    }
  }
  return rejectRun;
});
