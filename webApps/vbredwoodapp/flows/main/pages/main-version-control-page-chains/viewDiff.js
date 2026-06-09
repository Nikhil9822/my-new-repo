/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class viewDiff extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      const version = event.detail.context.item.data;
      $page.variables.diffRef = version.ref;
      $page.variables.diffDrawerOpen = true;
    }
  }
  return viewDiff;
});
