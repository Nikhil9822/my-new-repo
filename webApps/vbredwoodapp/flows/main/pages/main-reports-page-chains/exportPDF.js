/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class exportPDF extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      await Actions.fireCustomEvent(context, {
        name: 'vbNotification',
        payload: { summary: 'Generating PDF report...', messageType: 'info', displayMode: 'transient' }
      });
    }
  }
  return exportPDF;
});
