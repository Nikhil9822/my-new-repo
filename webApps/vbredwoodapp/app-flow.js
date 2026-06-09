/* Copyright (c) 2026, Oracle and/or its affiliates */

define(['oj-sp/spectra-shell/config/config'], function () {
  'use strict';

  // Patch the HCM color strip so it uses the brand token instead of the
  // hard-coded maroon that oj-sp injects. Runs once on first render and
  // re-checks on any subsequent DOM mutation.
  function patchHcmStrip() {
    const patch = () => {
      document.querySelectorAll('.oj-sp-header-general-overview-header-strip').forEach((el) => {
        if (!el.dataset.fmtPatched) {
          el.style.setProperty('background-color', 'var(--oj-palette-brand-60)', 'important');
          el.dataset.fmtPatched = 'true';
        }
      });
    };

    const observer = new MutationObserver(patch);
    observer.observe(document.body, { childList: true, subtree: true });
    patch();
  }

  class AppModule {
    constructor() {
      patchHcmStrip();
    }
  }

  return AppModule;
});
