/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';

  class closeNavDrawer extends ActionChain {
    async run(context) {
      const { $page } = context;
      $page.variables.sidebarExpanded = false;
    }
  }

  return closeNavDrawer;
});
