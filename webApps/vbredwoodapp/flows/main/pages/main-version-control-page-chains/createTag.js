/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class createTag extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      await Actions.fireCustomEvent(context, { name: 'vbNotification', payload: { summary: 'Tag created successfully', messageType: 'confirmation', displayMode: 'transient' } });
      $page.variables.newTagName = '';
      $page.variables.newTagRef = null;
    }
  }
  return createTag;
});
