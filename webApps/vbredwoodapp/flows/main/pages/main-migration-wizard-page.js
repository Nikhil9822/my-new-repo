/* Copyright (c) 2026, Oracle and/or its affiliates */

define([], () => {
  'use strict';

  const TYPE_DEFS = {
    bip: {
      label: 'BIP Reports',
      count: 312,
      columns: [
        { headerText: 'File Name',     field: 'name',         sortable: 'enabled' },
        { headerText: 'Type',          field: 'type',         sortable: 'enabled', width: '120px' },
        { headerText: 'Folder',        field: 'folder',       sortable: 'enabled' },
        { headerText: 'Last Modified', field: 'lastModified', sortable: 'enabled', width: '140px' },
        { headerText: 'Status',        field: 'status',       template: 'statusCell', sortable: 'enabled', width: '100px' }
      ],
      filter1: {
        label: 'Folder Path',
        options: [
          { value: '',                       label: 'All folders' },
          { value: '/Custom/Finance',        label: '/Custom/Finance' },
          { value: '/Custom/HCM',            label: '/Custom/HCM' },
          { value: '/Custom/Procurement',    label: '/Custom/Procurement' },
          { value: '/Shared Folders/Custom', label: '/Shared Folders/Custom' }
        ]
      },
      filter2: {
        label: 'Fetch Type',
        options: [
          { value: 'all',          label: 'Reports + Data Models' },
          { value: 'reports',      label: 'Reports' },
          { value: 'datamodels',   label: 'Data Models' },
          { value: 'subtemplates', label: 'Sub Templates' },
          { value: 'style',        label: 'Style Templates' }
        ]
      },
      sample: [
        { id: 'bip-1', name: 'AP_Invoice_Summary_Report.xdo',   type: 'Report',     folder: '/Custom/Finance',        lastModified: '2026-05-10', status: 'Active' },
        { id: 'bip-2', name: 'Employee_Payroll_Report.xdo',     type: 'Report',     folder: '/Custom/HCM',            lastModified: '2026-05-08', status: 'Active' },
        { id: 'bip-3', name: 'PO_Summary_Report.xdo',           type: 'Report',     folder: '/Custom/Procurement',    lastModified: '2026-04-22', status: 'Active' },
        { id: 'bip-4', name: 'GL_Trial_Balance_Report.xdo',     type: 'Report',     folder: '/Custom/Finance',        lastModified: '2026-03-15', status: 'Inactive' },
        { id: 'bip-5', name: 'HCM_Absence_Report.xdo',          type: 'Report',     folder: '/Custom/HCM',            lastModified: '2026-05-01', status: 'Active' },
        { id: 'bip-6', name: 'Invoice_DataModel.xdm',           type: 'Data Model', folder: '/Custom/Finance',        lastModified: '2026-04-10', status: 'Active' },
        { id: 'bip-7', name: 'AR_Aging_Report.xdo',             type: 'Report',     folder: '/Shared Folders/Custom', lastModified: '2026-02-28', status: 'Active' },
        { id: 'bip-8', name: 'Expense_DataModel.xdm',           type: 'Data Model', folder: '/Custom/Finance',        lastModified: '2026-05-14', status: 'Draft' }
      ]
    },

    lookup: {
      label: 'Lookups',
      count: 258,
      columns: [
        { headerText: 'Lookup Type', field: 'lookupType', sortable: 'enabled' },
        { headerText: 'Meaning',     field: 'meaning',    sortable: 'enabled' },
        { headerText: 'Module',      field: 'module',     sortable: 'enabled', width: '100px' },
        { headerText: 'Codes',       field: 'codes',      sortable: 'enabled', width: '80px' },
        { headerText: 'Updated',     field: 'updated',    sortable: 'enabled', width: '130px' },
        { headerText: 'Status',      field: 'status',     template: 'statusCell', sortable: 'enabled', width: '100px' }
      ],
      filter1: {
        label: 'Lookup Type',
        options: [
          { value: '',            label: 'All' },
          { value: 'Standard',    label: 'Standard' },
          { value: 'Common',      label: 'Common' },
          { value: 'Set-Enabled', label: 'Set-Enabled' }
        ]
      },
      filter2: {
        label: 'Module',
        options: [
          { value: '',       label: 'All' },
          { value: 'HCM',    label: 'HCM' },
          { value: 'FIN',    label: 'FIN' },
          { value: 'SCM',    label: 'SCM' },
          { value: 'CRM',    label: 'CRM' },
          { value: 'PPM',    label: 'PPM' },
          { value: 'Custom', label: 'Custom' }
        ]
      },
      sample: [
        { id: 'lkp-1', lookupType: 'ORA_HCM_ABSENCE_TYPE',     meaning: 'Absence Category',       module: 'HCM',    codes: 8,  updated: '2026-04-20', status: 'Active' },
        { id: 'lkp-2', lookupType: 'ORA_FIN_PAYMENT_METHOD',   meaning: 'Payment Method Type',    module: 'FIN',    codes: 5,  updated: '2026-03-18', status: 'Active' },
        { id: 'lkp-3', lookupType: 'CUSTOM_APPROVAL_STATUS',   meaning: 'Custom Approval Status', module: 'Custom', codes: 4,  updated: '2026-05-05', status: 'Active' },
        { id: 'lkp-4', lookupType: 'ORA_SCM_ITEM_CATEGORY',    meaning: 'Item Category Type',     module: 'SCM',    codes: 12, updated: '2025-12-10', status: 'Inactive' },
        { id: 'lkp-5', lookupType: 'ORA_CRM_OPPORTUNITY_TYPE', meaning: 'Opportunity Type',       module: 'CRM',    codes: 6,  updated: '2026-02-14', status: 'Active' },
        { id: 'lkp-6', lookupType: 'ORA_PPM_PROJECT_STATUS',   meaning: 'Project Status',         module: 'PPM',    codes: 7,  updated: '2026-04-30', status: 'Draft' }
      ]
    },

    profile: {
      label: 'Profile Options',
      count: 187,
      columns: [
        { headerText: 'Profile Code',  field: 'profileCode',  sortable: 'enabled' },
        { headerText: 'Display Name',  field: 'displayName',  sortable: 'enabled' },
        { headerText: 'Category',      field: 'category',     sortable: 'enabled', width: '120px' },
        { headerText: 'Levels',        field: 'levels',       sortable: 'enabled', width: '120px' },
        { headerText: 'Default Value', field: 'defaultValue', sortable: 'enabled', width: '130px' },
        { headerText: 'Status',        field: 'status',       template: 'statusCell', sortable: 'enabled', width: '100px' }
      ],
      filter1: {
        label: 'Profile Level',
        options: [
          { value: '',        label: 'All' },
          { value: 'Site',    label: 'Site' },
          { value: 'User',    label: 'User' },
          { value: 'Role',    label: 'Role' },
          { value: 'Product', label: 'Product' }
        ]
      },
      filter2: {
        label: 'Category',
        options: [
          { value: '',            label: 'All' },
          { value: 'Application', label: 'Application' },
          { value: 'Security',    label: 'Security' },
          { value: 'UI',          label: 'UI' },
          { value: 'Integration', label: 'Integration' },
          { value: 'Custom',      label: 'Custom' }
        ]
      },
      sample: [
        { id: 'prof-1', profileCode: 'ORA_HCM_DATE_FORMAT',         displayName: 'HCM Date Display Format',   category: 'UI',          levels: 'Site, User', defaultValue: 'YYYY-MM-DD', status: 'Active' },
        { id: 'prof-2', profileCode: 'ORA_FIN_DEFAULT_CURRENCY',    displayName: 'Default Currency',          category: 'Application', levels: 'Site',       defaultValue: 'USD',        status: 'Active' },
        { id: 'prof-3', profileCode: 'CUSTOM_APPROVAL_TIMEOUT',     displayName: 'Custom Approval Timeout',   category: 'Custom',      levels: 'Site, Role', defaultValue: '72',         status: 'Active' },
        { id: 'prof-4', profileCode: 'ORA_SCM_AUTO_RECEIPT',        displayName: 'Auto Receipt Processing',   category: 'Application', levels: 'Site',       defaultValue: 'N',          status: 'Inactive' },
        { id: 'prof-5', profileCode: 'ORA_SEC_PASSWORD_COMPLEXITY', displayName: 'Password Complexity Rules', category: 'Security',    levels: 'Site',       defaultValue: 'MEDIUM',     status: 'Active' }
      ]
    },

    valueset: {
      label: 'Value Sets',
      count: 142,
      columns: [
        { headerText: 'Code',         field: 'code',        sortable: 'enabled' },
        { headerText: 'Description',  field: 'description', sortable: 'enabled' },
        { headerText: 'Type',         field: 'type',        sortable: 'enabled', width: '130px' },
        { headerText: 'Module',       field: 'module',      sortable: 'enabled', width: '100px' },
        { headerText: 'Values Count', field: 'valuesCount', sortable: 'enabled', width: '110px' },
        { headerText: 'Status',       field: 'status',      template: 'statusCell', sortable: 'enabled', width: '100px' }
      ],
      filter1: {
        label: 'Validation Type',
        options: [
          { value: '',            label: 'All' },
          { value: 'Independent', label: 'Independent' },
          { value: 'Dependent',   label: 'Dependent' },
          { value: 'Table',       label: 'Table' },
          { value: 'Format Only', label: 'Format Only' },
          { value: 'Subset',      label: 'Subset' }
        ]
      },
      filter2: {
        label: 'Module',
        options: [
          { value: '',    label: 'All' },
          { value: 'HCM', label: 'HCM' },
          { value: 'FIN', label: 'FIN' },
          { value: 'SCM', label: 'SCM' },
          { value: 'CRM', label: 'CRM' },
          { value: 'PPM', label: 'PPM' }
        ]
      },
      sample: [
        { id: 'vs-1', code: 'ORA_HCM_GRADE',      description: 'Employee Grade Values',     type: 'Independent', module: 'HCM', valuesCount: 15, status: 'Active' },
        { id: 'vs-2', code: 'ORA_FIN_COST_CENTER', description: 'Cost Center Codes',         type: 'Table',       module: 'FIN', valuesCount: 42, status: 'Active' },
        { id: 'vs-3', code: 'CUSTOM_REGION_CODE',  description: 'Custom Region Codes',       type: 'Independent', module: 'HCM', valuesCount: 8,  status: 'Active' },
        { id: 'vs-4', code: 'ORA_SCM_UOM',         description: 'Unit of Measure',           type: 'Independent', module: 'SCM', valuesCount: 22, status: 'Active' },
        { id: 'vs-5', code: 'ORA_PPM_TASK_STATUS', description: 'Project Task Status Codes', type: 'Independent', module: 'PPM', valuesCount: 6,  status: 'Inactive' }
      ]
    },

    dff: {
      label: 'DFF',
      count: 98,
      columns: [
        { headerText: 'Code',             field: 'code',            sortable: 'enabled' },
        { headerText: 'Title',            field: 'title',           sortable: 'enabled' },
        { headerText: 'Table',            field: 'table',           sortable: 'enabled', width: '150px' },
        { headerText: 'Context Segments', field: 'contextSegments', sortable: 'enabled', width: '140px' },
        { headerText: 'Application',      field: 'application',     sortable: 'enabled', width: '130px' },
        { headerText: 'Status',           field: 'status',          template: 'statusCell', sortable: 'enabled', width: '100px' }
      ],
      filter1: {
        label: 'Application',
        options: [
          { value: '',            label: 'All' },
          { value: 'Receivables', label: 'Receivables' },
          { value: 'Payables',    label: 'Payables' },
          { value: 'GL',          label: 'GL' },
          { value: 'HCM',         label: 'HCM' },
          { value: 'Procurement', label: 'Procurement' }
        ]
      },
      filter2: {
        label: 'Enabled',
        options: [
          { value: '', label: 'All' },
          { value: 'Y', label: 'Enabled only' },
          { value: 'N', label: 'Disabled only' }
        ]
      },
      sample: [
        { id: 'dff-1', code: 'RA_CUSTOMERS',  title: 'Customer Additional Info',  table: 'RA_CUSTOMERS_ALL',  contextSegments: 3, application: 'Receivables', status: 'Active' },
        { id: 'dff-2', code: 'AP_INVOICES',   title: 'Invoice Additional Data',   table: 'AP_INVOICES_ALL',   contextSegments: 5, application: 'Payables',    status: 'Active' },
        { id: 'dff-3', code: 'GL_JE_HEADERS', title: 'Journal Entry Extra Info',  table: 'GL_JE_HEADERS',     contextSegments: 2, application: 'GL',          status: 'Inactive' },
        { id: 'dff-4', code: 'PER_ALL_PEOPLE',title: 'Employee Extra Attributes', table: 'PER_ALL_PEOPLE_F',  contextSegments: 8, application: 'HCM',         status: 'Active' },
        { id: 'dff-5', code: 'PO_HEADERS',    title: 'PO Header Flexfield',       table: 'PO_HEADERS_ALL',    contextSegments: 4, application: 'Procurement', status: 'Draft' }
      ]
    },

    kff: {
      label: 'KFF',
      count: 61,
      columns: [
        { headerText: 'Code',           field: 'code',          sortable: 'enabled' },
        { headerText: 'Structure Name', field: 'structureName', sortable: 'enabled' },
        { headerText: 'Application',    field: 'application',   sortable: 'enabled', width: '120px' },
        { headerText: 'Segments',       field: 'segments',      sortable: 'enabled', width: '90px' },
        { headerText: 'Active Date',    field: 'activeDate',    sortable: 'enabled', width: '120px' },
        { headerText: 'Status',         field: 'status',        template: 'statusCell', sortable: 'enabled', width: '100px' }
      ],
      filter1: {
        label: 'Application',
        options: [
          { value: '',    label: 'All' },
          { value: 'GL',  label: 'GL' },
          { value: 'HCM', label: 'HCM' },
          { value: 'SCM', label: 'SCM' },
          { value: 'FA',  label: 'FA' }
        ]
      },
      filter2: {
        label: 'Structure Type',
        options: [
          { value: '',                     label: 'All' },
          { value: 'Accounting Flexfield', label: 'Accounting Flexfield' },
          { value: 'Cost Allocation',      label: 'Cost Allocation' },
          { value: 'Asset Category',       label: 'Asset Category' },
          { value: 'Job',                  label: 'Job' }
        ]
      },
      sample: [
        { id: 'kff-1', code: 'GL#',  structureName: 'Accounting Flexfield Primary', application: 'GL',  segments: 7, activeDate: '2024-01-01', status: 'Active' },
        { id: 'kff-2', code: 'COST', structureName: 'Cost Allocation Primary',      application: 'HCM', segments: 5, activeDate: '2024-01-01', status: 'Active' },
        { id: 'kff-3', code: 'MSTK', structureName: 'System Items Primary',         application: 'SCM', segments: 4, activeDate: '2024-01-01', status: 'Active' },
        { id: 'kff-4', code: 'CAT#', structureName: 'Asset Category Structure 1',   application: 'FA',  segments: 3, activeDate: '2023-07-01', status: 'Inactive' },
        { id: 'kff-5', code: 'JOB',  structureName: 'Job Flexfield Primary',        application: 'HCM', segments: 4, activeDate: '2024-01-01', status: 'Active' }
      ]
    },

    oic: {
      label: 'OIC Integrations',
      count: 154,
      columns: [
        { headerText: 'Name',       field: 'name',       sortable: 'enabled' },
        { headerText: 'Identifier', field: 'identifier', sortable: 'enabled' },
        { headerText: 'Type',       field: 'type',       sortable: 'enabled', width: '120px' },
        { headerText: 'Package',    field: 'package',    sortable: 'enabled', width: '170px' },
        { headerText: 'Version',    field: 'version',    sortable: 'enabled', width: '80px' },
        { headerText: 'Status',     field: 'status',     template: 'statusCell', sortable: 'enabled', width: '100px' }
      ],
      filter1: {
        label: 'Integration Type',
        options: [
          { value: '',           label: 'All' },
          { value: 'REST',       label: 'REST' },
          { value: 'SOAP',       label: 'SOAP' },
          { value: 'App Driven', label: 'App Driven' },
          { value: 'Scheduled',  label: 'Scheduled' },
          { value: 'File',       label: 'File' },
          { value: 'Event',      label: 'Event' }
        ]
      },
      filter2: {
        label: 'Package',
        options: [
          { value: '',               label: 'All' },
          { value: 'oic.custom.fin', label: 'oic.custom.fin' },
          { value: 'oic.custom.hcm', label: 'oic.custom.hcm' },
          { value: 'oic.custom.scm', label: 'oic.custom.scm' },
          { value: 'oic.custom.crm', label: 'oic.custom.crm' }
        ]
      },
      sample: [
        { id: 'oic-1', name: 'Payroll Sync to Third Party', identifier: 'PAYROLL_SYNC_V1',     type: 'Scheduled',  package: 'oic.custom.hcm', version: '01.00', status: 'Active' },
        { id: 'oic-2', name: 'Invoice Import from ERP',     identifier: 'INVOICE_IMPORT_V2',   type: 'App Driven', package: 'oic.custom.fin', version: '02.00', status: 'Active' },
        { id: 'oic-3', name: 'Customer Order Sync',         identifier: 'CUSTOMER_ORDER_SYNC', type: 'REST',       package: 'oic.custom.crm', version: '01.01', status: 'Inactive' },
        { id: 'oic-4', name: 'Inventory Update Batch',      identifier: 'INVENTORY_BATCH_V1',  type: 'File',       package: 'oic.custom.scm', version: '01.00', status: 'Active' },
        { id: 'oic-5', name: 'GL Journal Posting Event',    identifier: 'GL_JOURNAL_EVENT_V1', type: 'Event',      package: 'oic.custom.fin', version: '01.02', status: 'Draft' }
      ]
    },

    vbcs: {
      label: 'VBCS Apps',
      count: 72,
      columns: [
        { headerText: 'Name',          field: 'name',         sortable: 'enabled' },
        { headerText: 'App ID',        field: 'appId',        sortable: 'enabled' },
        { headerText: 'Type',          field: 'type',         sortable: 'enabled', width: '110px' },
        { headerText: 'Version',       field: 'version',      sortable: 'enabled', width: '90px' },
        { headerText: 'Last Deployed', field: 'lastDeployed', sortable: 'enabled', width: '130px' },
        { headerText: 'Status',        field: 'status',       template: 'statusCell', sortable: 'enabled', width: '100px' }
      ],
      filter1: {
        label: 'App Type',
        options: [
          { value: '',           label: 'All' },
          { value: 'Web App',    label: 'Web App' },
          { value: 'Mobile App', label: 'Mobile App' },
          { value: 'Extension',  label: 'Extension' }
        ]
      },
      filter2: {
        label: 'Environment',
        options: [
          { value: '',      label: 'All' },
          { value: 'DEV',   label: 'DEV' },
          { value: 'TEST',  label: 'TEST' },
          { value: 'STAGE', label: 'STAGE' }
        ]
      },
      sample: [
        { id: 'vbcs-1', name: 'Fusion Migration Tool',   appId: 'vbredwoodapp',      type: 'Web App',    version: '2.0.0', lastDeployed: '2026-05-20', status: 'Active' },
        { id: 'vbcs-2', name: 'HCM Self Service Portal', appId: 'hcmselfservice',    type: 'Web App',    version: '1.3.2', lastDeployed: '2026-04-15', status: 'Active' },
        { id: 'vbcs-3', name: 'Procurement Mobile App',  appId: 'procurementmobile', type: 'Mobile App', version: '1.1.0', lastDeployed: '2026-03-10', status: 'Inactive' },
        { id: 'vbcs-4', name: 'Finance Dashboard Ext',   appId: 'financeext',        type: 'Extension',  version: '1.0.5', lastDeployed: '2026-02-28', status: 'Active' },
        { id: 'vbcs-5', name: 'SCM Inventory Tracker',   appId: 'scminventory',      type: 'Web App',    version: '1.2.1', lastDeployed: '2026-05-01', status: 'Draft' }
      ]
    }
  };

  class PageModule {

    getTypeDef(key) {
      return TYPE_DEFS[key] || null;
    }

    getTypeKeys() {
      return ['bip', 'lookup', 'profile', 'valueset', 'dff', 'kff', 'oic', 'vbcs'];
    }

    getColumns(key) {
      return TYPE_DEFS[key] ? TYPE_DEFS[key].columns : [];
    }

    getFilter1(key) {
      return TYPE_DEFS[key] ? TYPE_DEFS[key].filter1 : null;
    }

    getFilter2(key) {
      return TYPE_DEFS[key] ? TYPE_DEFS[key].filter2 : null;
    }

    getSample(key) {
      return TYPE_DEFS[key] ? TYPE_DEFS[key].sample : [];
    }

    getTypeLabel(key) {
      return TYPE_DEFS[key] ? TYPE_DEFS[key].label : '';
    }

    getTypeCount(key) {
      return TYPE_DEFS[key] ? TYPE_DEFS[key].count : 0;
    }

  }

  return PageModule;
});
