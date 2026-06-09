/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class createPipeline extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      await Actions.fireCustomEvent(context, { name: 'vbNotification', payload: { summary: 'Use the Migration Wizard to create a new pipeline.', messageType: 'info', displayMode: 'transient' } });
    }
  }
  return createPipeline;
});
