/* Copyright (c) 2026, Oracle and/or its affiliates */
define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';

  const TAB_TYPE_MAP = {
    'reports-tab':        ['Report', 'BIP'],
    'flexfields-tab':     ['Flexfield'],
    'lookups-tab':        ['Lookup'],
    'security-roles-tab': ['Security Role'],
    'profiles-tab':       ['Profile'],
    'workflows-tab':      ['Workflow'],
    'integrations-tab':   ['Integration'],
    'notifications-tab':  ['Notification'],
    'translations-tab':   ['Translation'],
    'custom-objects-tab': ['Custom Object'],
    'dff-tab':            ['DFF'],
    'value-sets-tab':     ['Value Set'],
    'trees-tab':          ['Tree'],
    'approval-groups-tab':['Approval Group'],
    'doc-sequences-tab':  ['Doc Sequence'],
    'profile-options-tab':['Profile Option'],
    'eff-tab':            ['Ext Flexfield'],
    'page-composer-tab':  ['Page']
  };

  class filterObjects extends ActionChain {
    async run(context) {
      const { $page } = context;
      const raw          = ($page.variables.searchText || '').toLowerCase().trim();
      const filterModule = $page.variables.filterEnv;
      const tabTypes     = TAB_TYPE_MAP[$page.variables.activeTab];

      let result = $page.variables.objectsData;

      if (tabTypes && tabTypes.length) {
        result = result.filter(item => tabTypes.includes(item.type));
      }
      if (filterModule && filterModule !== 'all') {
        result = result.filter(item => item.module === filterModule);
      }
      if (raw) {
        result = result.filter(item =>
          (item.name        && item.name.toLowerCase().includes(raw))        ||
          (item.type        && item.type.toLowerCase().includes(raw))        ||
          (item.module      && item.module.toLowerCase().includes(raw))      ||
          (item.status      && item.status.toLowerCase().includes(raw))      ||
          (item.description && item.description.toLowerCase().includes(raw)) ||
          (item.version     && item.version.toLowerCase().includes(raw))
        );
      }

      $page.variables.filteredData       = result;
      $page.variables.filteredObjectsADP = { data: result, keyAttributes: 'id' };
    }
  }
  return filterObjects;
});
