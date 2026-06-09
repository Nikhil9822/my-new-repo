/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class openAddUser extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      $page.variables.editUser = { id: null, displayName: '', email: '', role: 'VIEWER', tempPassword: '' };
      $page.variables.editMode = 'add';
      $page.variables.editDrawerOpen = true;
    }
  }
  return openAddUser;
});
