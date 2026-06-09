/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class exportAudit extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      await Actions.fireCustomEvent(context, {
        name: 'vbNotification',
        payload: { summary: 'Exporting audit trail to CSV...', messageType: 'info', displayMode: 'transient' }
      });
    }
  }
  return exportAudit;
});
