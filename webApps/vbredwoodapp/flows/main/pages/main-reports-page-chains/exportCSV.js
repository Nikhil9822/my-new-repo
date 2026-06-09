/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class exportCSV extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      await Actions.fireCustomEvent(context, {
        name: 'vbNotification',
        payload: { summary: 'Exporting data to CSV...', messageType: 'info', displayMode: 'transient' }
      });
    }
  }
  return exportCSV;
});
