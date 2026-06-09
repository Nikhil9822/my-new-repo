/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class filterVersions extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const filterText = ($page.variables.versionFilter || '').toLowerCase();
      if (!filterText) {
        $page.variables.versionsData = $page.variables.versionsData.slice();
      } else {
        const allVersions = $page.variables.versionsData;
        const filtered = allVersions.filter(v =>
          (v.ref && v.ref.toLowerCase().includes(filterText)) ||
          (v.message && v.message.toLowerCase().includes(filterText))
        );
        $page.variables.versionsData = filtered;
      }
    }
  }
  return filterVersions;
});
