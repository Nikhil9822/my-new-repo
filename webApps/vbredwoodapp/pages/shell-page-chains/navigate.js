/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';

  class navigate extends ActionChain {
    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.pageId  target page ID from nav item click
     */
    async run(context, { pageId }) {
      const { $page } = context;

      if (!pageId) return;

      $page.variables.currentPage = pageId;

      try {
        await Actions.navigateToFlow(context, { flow: 'main', page: pageId });
      } catch (err) {
        if (err && err.name === 'AbortError') return;
        throw err;
      }
    }
  }

  return navigate;
});
