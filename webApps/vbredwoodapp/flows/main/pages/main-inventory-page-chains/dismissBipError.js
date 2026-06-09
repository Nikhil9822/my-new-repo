/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class dismissBipError extends ActionChain {
    async run(context) {
      context.$page.variables.bipApiError = '';
    }
  }
  return dismissBipError;
});
