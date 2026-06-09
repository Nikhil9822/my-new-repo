/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class confirmDeactivate extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      const user =
        (event && event.detail && event.detail.context && event.detail.context.item && event.detail.context.item.data) ||
        (event && event.detail && event.detail.rowData) ||
        {};
      const users = $page.variables.usersData ? [...$page.variables.usersData] : [];
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) {
        users[idx] = Object.assign({}, users[idx], { status: 'Inactive' });
        $page.variables.usersData = users;
      }
      await Actions.fireCustomEvent(context, {
        name: 'vbNotification',
        payload: { summary: 'User deactivated', messageType: 'confirmation', displayMode: 'transient' }
      });
    }
  }
  return confirmDeactivate;
});
