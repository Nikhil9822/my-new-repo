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

  class ButtonActionChain6 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const results = await ActionUtils.forEach($variables.FilteredData, async (item, index) => {

        const buildEquipmentPayloadArray = await $functions.buildEquipmentPayloadArray(item);
        debugger;
      }, { mode: 'serial' });
    }
  }

  return ButtonActionChain6;
});
