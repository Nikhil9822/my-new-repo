/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class selectPipeline extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      const pipeline = event.detail.context.item.data;
      $page.variables.selectedPipeline = pipeline;
      $page.variables.pipelineDetailTab = 'def-tab';
    }
  }
  return selectPipeline;
});
