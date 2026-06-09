/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class viewJobDetail extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      const job = event.detail.context.item.data;
      $page.variables.selectedJob = job;
      $page.variables.drawerOpen = true;
    }
  }
  return viewJobDetail;
});
