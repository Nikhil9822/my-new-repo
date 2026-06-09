/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class jobDetailTabChanged extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      $page.variables.jobDetailTab = event.detail.value;
    }
  }
  return jobDetailTabChanged;
});
