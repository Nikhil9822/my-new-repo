/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class filterUsers extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const filterText = ($page.variables.searchText || '').toLowerCase();
      const allUsers = $page.variables.usersData || [];
      if (!filterText) {
        $page.variables.usersData = allUsers;
        return;
      }
      const filtered = allUsers.filter(u =>
        (u.name && u.name.toLowerCase().includes(filterText)) ||
        (u.email && u.email.toLowerCase().includes(filterText))
      );
      $page.variables.usersData = filtered;
    }
  }
  return filterUsers;
});
