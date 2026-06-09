/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class restoreVersion extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      await Actions.fireCustomEvent(context, { name: 'vbNotification', payload: { summary: 'Version restored successfully. A new migration job has been queued.', messageType: 'confirmation', displayMode: 'transient' } });
    }
  }
  return restoreVersion;
});
