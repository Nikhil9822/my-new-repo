/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class saveUser extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const editUser = $page.variables.editUser;
      const users = $page.variables.usersData ? [...$page.variables.usersData] : [];
      if (editUser.id === null || editUser.id === undefined) {
        // Add new user
        const newUser = Object.assign({}, editUser, { id: Date.now() });
        users.push(newUser);
      } else {
        // Update existing user
        const idx = users.findIndex(u => u.id === editUser.id);
        if (idx !== -1) {
          users[idx] = Object.assign({}, editUser);
        }
      }
      $page.variables.usersData = users;
      await Actions.fireCustomEvent(context, {
        name: 'vbNotification',
        payload: { summary: 'User saved successfully', messageType: 'confirmation', displayMode: 'transient' }
      });
      $page.variables.editDrawerOpen = false;
    }
  }
  return saveUser;
});
