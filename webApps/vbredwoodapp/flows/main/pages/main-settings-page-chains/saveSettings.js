/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class saveSettings extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      await Actions.fireCustomEvent(context, {
        name: 'vbNotification',
        payload: { summary: 'Settings saved successfully', messageType: 'confirmation', displayMode: 'transient' }
      });
    }
  }
  return saveSettings;
});
