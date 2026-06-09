/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class pipelineDetailTabChanged extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      $page.variables.pipelineDetailTab = event.detail.value;
    }
  }
  return pipelineDetailTabChanged;
});
