/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class closeTagManager extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.newTagName = '';
      $page.variables.newTagRef = null;
    }
  }
  return closeTagManager;
});
