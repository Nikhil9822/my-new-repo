/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class initWizard extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.currentStep = 'step1';
      $page.variables.wizardComplete = false;
      $page.variables.isExecuting = false;
      $page.variables.confirmText = '';
    }
  }
  return initWizard;
});
