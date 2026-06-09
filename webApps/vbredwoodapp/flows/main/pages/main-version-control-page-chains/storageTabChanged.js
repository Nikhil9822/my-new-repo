/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class storageTabChanged extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      $page.variables.activeStorageTab = event.detail.value;
    }
  }
  return storageTabChanged;
});
