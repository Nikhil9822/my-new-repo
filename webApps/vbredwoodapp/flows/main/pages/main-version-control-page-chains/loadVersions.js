/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class loadVersions extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      try {
        $page.variables.isLoading = true;
        $page.variables.versionsData = [
          { id: 1, ref: 'a1b2c3d', tag: 'v2.1.0', message: 'Add payroll integration module', author: 'Dinesh N', date: '2026-05-18', objectCount: 12 },
          { id: 2, ref: 'e4f5g6h', tag: null, message: 'Update AP invoice workflow - step 3 approval rule', author: 'Priya S', date: '2026-05-15', objectCount: 3 },
          { id: 3, ref: 'i7j8k9l', tag: 'v2.0.0', message: 'Major release: CX customer 360 pages', author: 'Raj K', date: '2026-05-01', objectCount: 28 },
          { id: 4, ref: 'm0n1o2p', tag: null, message: 'Fix leave balance calculation report', author: 'Dinesh N', date: '2026-04-22', objectCount: 1 },
          { id: 5, ref: 'q3r4s5t', tag: 'v1.3.2', message: 'HCM payroll report formatting updates', author: 'Amit V', date: '2026-04-10', objectCount: 5 }
        ];
        $page.variables.isLoading = false;
      } catch (e) {
        $page.variables.isLoading = false;
        await Actions.fireCustomEvent(context, { name: 'vbNotification', payload: { summary: 'Failed to load versions. Please try again.', messageType: 'error', displayMode: 'transient' } });
      }
    }
  }
  return loadVersions;
});
