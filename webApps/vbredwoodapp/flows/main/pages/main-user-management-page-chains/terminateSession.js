/* Copyright (c) 2026, Oracle and/or its affiliates */
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';
  class terminateSession extends ActionChain {
    async run(context, params) {
      const { $page } = context;
      const { event } = params;
      const session =
        (event && event.detail && event.detail.context && event.detail.context.item && event.detail.context.item.data) ||
        (event && event.detail && event.detail.rowData) ||
        {};
      const sessions = ($page.variables.sessionsData || []).filter(s => s.id !== session.id);
      $page.variables.sessionsData = sessions;
      await Actions.fireCustomEvent(context, {
        name: 'vbNotification',
        payload: { summary: 'Session terminated', messageType: 'confirmation', displayMode: 'transient' }
      });
    }
  }
  return terminateSession;
});
