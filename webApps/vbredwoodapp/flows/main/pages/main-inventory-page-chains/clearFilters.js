/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';
  class clearFilters extends ActionChain {
    async run(context) {
      const { $page } = context;
      const all = $page.variables.objectsData;
      $page.variables.searchText         = '';
      $page.variables.filterEnv          = 'all';
      $page.variables.filteredData       = all;
      $page.variables.filteredObjectsADP = { data: all, keyAttributes: 'id' };
    }
  }
  return clearFilters;
});
