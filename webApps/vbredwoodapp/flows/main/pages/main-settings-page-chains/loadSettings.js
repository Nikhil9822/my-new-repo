/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class loadSettings extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      try {
        $page.variables.settings = {
          appName: 'Fusion Object Migration Tool',
          defaultEnv: '',
          defaultSelectionMode: 'manual',
          dateFormat: 'YYYY-MM-DD HH:mm',
          scanTimeout: 300,
          autoScanFrequency: 'manual',
          storageProvider: 'git',
          gitDefaultRepo: '',
          gitDefaultBranch: 'main',
          gitAuthorName: '',
          gitAuthorEmail: '',
          ociNamespace: '',
          ociDefaultBucket: '',
          ociRegion: '',
          notifySuccess: true,
          notifyFailure: true,
          notifyApproval: true,
          dailySummary: false,
          notificationRecipients: 'dinesh@rite.digital',
          sessionTimeout: 30,
          maxSessions: 5,
          requireMfaProd: true,
          enforceIpAllowlist: false,
          auditRetentionDays: 365,
          logAllCalls: false
        };
      } catch (e) {
        await Actions.fireCustomEvent(context, {
          name: 'vbNotification',
          payload: { summary: 'Failed to load settings', messageType: 'error', displayMode: 'transient' }
        });
      }
    }
  }
  return loadSettings;
});
