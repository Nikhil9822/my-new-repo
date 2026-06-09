/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class loadUserManagement extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.isLoading = true;
      try {
        $page.variables.usersData = [
          { id: 1, name: 'Dinesh Neredu', email: 'dinesh@rite.digital', role: 'Admin', status: 'Active', lastLogin: '2026-05-19 08:30' },
          { id: 2, name: 'Priya Sharma', email: 'priya@rite.digital', role: 'Migration Manager', status: 'Active', lastLogin: '2026-05-18 14:20' },
          { id: 3, name: 'Raj Kumar', email: 'raj@rite.digital', role: 'Developer', status: 'Active', lastLogin: '2026-05-17 09:00' },
          { id: 4, name: 'Amit Verma', email: 'amit@rite.digital', role: 'Viewer', status: 'Inactive', lastLogin: '2026-04-30 16:45' }
        ];
        $page.variables.sessionsData = [
          { id: 1, userId: 1, user: 'Dinesh Neredu', ip: '192.168.1.10', loginTime: '2026-05-19 08:30', device: 'Chrome / Windows 11' },
          { id: 2, userId: 2, user: 'Priya Sharma', ip: '192.168.1.25', loginTime: '2026-05-19 09:15', device: 'Firefox / macOS' }
        ];
      } catch (e) {
        await Actions.fireCustomEvent(context, {
          name: 'vbNotification',
          payload: { summary: 'Failed to load user data', messageType: 'error', displayMode: 'transient' }
        });
      } finally {
        $page.variables.isLoading = false;
      }
    }
  }
  return loadUserManagement;
});
