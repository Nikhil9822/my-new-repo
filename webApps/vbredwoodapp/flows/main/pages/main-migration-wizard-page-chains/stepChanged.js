/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class stepChanged extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      $page.variables.currentStep = event.detail.value;
    }
  }
  return stepChanged;
});
