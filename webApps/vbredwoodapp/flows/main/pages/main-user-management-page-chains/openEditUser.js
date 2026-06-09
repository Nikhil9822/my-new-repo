/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class openEditUser extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      const user =
        (event && event.detail && event.detail.context && event.detail.context.item && event.detail.context.item.data) ||
        (event && event.detail && event.detail.rowData) ||
        {};
      $page.variables.editUser = JSON.parse(JSON.stringify(user));
      $page.variables.editMode = 'edit';
      $page.variables.editDrawerOpen = true;
    }
  }
  return openEditUser;
});
