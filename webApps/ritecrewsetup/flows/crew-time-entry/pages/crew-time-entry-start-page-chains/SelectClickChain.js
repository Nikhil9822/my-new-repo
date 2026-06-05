define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class DateRangeClickChain extends ActionChain {

    async run(context, { event }) {
      const { $variables } = context;
      const targetWeek = $variables.searchobj.dateRange1;
      if (!targetWeek) return;

      this._scrollToCurrentWeek(targetWeek);
    }

    _scrollToCurrentWeek(targetWeek) {
      const MAX_ATTEMPTS = 50;
      const INTERVAL_MS = 100;
      const SCROLL_STEP = 400;
      let attempts = 0;

      const intervalId = setInterval(() => {
        attempts++;

        const dropdown = document.getElementById('lovDropdown_dateRange');
        if (!dropdown) {
          if (attempts >= MAX_ATTEMPTS) clearInterval(intervalId);
          return;
        }

        const items = dropdown.querySelectorAll('.oj-listview-item');
        for (const item of items) {
          if (item.textContent.trim() === targetWeek) {
            clearInterval(intervalId);
            setTimeout(() => {
              item.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, 50);
            return;
          }
        }

        const scrollEl = this._findScrollableParent(dropdown);
        if (scrollEl) {
          scrollEl.scrollTop += SCROLL_STEP;
        }

        if (attempts >= MAX_ATTEMPTS) {
          clearInterval(intervalId);
        }
      }, INTERVAL_MS);
    }

    _findScrollableParent(dropdown) {
      const listView = dropdown.querySelector('.oj-select-results');
      if (!listView) return null;

      if (listView.scrollHeight > listView.clientHeight) {
        return listView;
      }

      let parent = listView.parentElement;
      while (parent && parent !== dropdown) {
        if (parent.scrollHeight > parent.clientHeight) {
          return parent;
        }
        parent = parent.parentElement;
      }

      return listView;
    }
  }

  return DateRangeClickChain;
});