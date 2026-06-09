/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';

  class toggleNavDrawer extends ActionChain {
    async run(context) {
      const { $page } = context;
      $page.variables.sidebarExpanded = !$page.variables.sidebarExpanded;
    }
  }

  return toggleNavDrawer;
});
