/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class prevStep extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'];
      const currentIndex = steps.indexOf($page.variables.currentStep);
      if (currentIndex > 0) {
        $page.variables.currentStep = steps[currentIndex - 1];
      }
    }
  }
  return prevStep;
});
