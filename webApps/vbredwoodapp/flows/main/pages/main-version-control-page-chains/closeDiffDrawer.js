/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class closeDiffDrawer extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.diffDrawerOpen = false;
    }
  }
  return closeDiffDrawer;
});
