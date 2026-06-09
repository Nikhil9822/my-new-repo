/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class tabChanged extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      if (event && event.detail && event.detail.value !== undefined) {
        $page.variables.activeTab = event.detail.value;
      }
    }
  }
  return tabChanged;
});
