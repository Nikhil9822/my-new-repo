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

  class PageVbEnterChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
        uriParams: {
          'p_end_date': "",
          'p_equipment_name': "",
          'p_equipment_resource_class': "",
          'p_start_date': "",
        },
      });

      if (response.ok) {
        const loadOpen2 = await Actions.callComponentMethod(context, {
          selector: '#load',
          method: 'open',
        });

        const generateStructure = await $functions.generateStructure(JSON.stringify(response.body.items));

        const navigationContent = await $functions.getNavigationContent(generateStructure);

        $variables.navTree = navigationContent;

        const loadClose = await Actions.callComponentMethod(context, {
          selector: '#load',
          method: 'close',
        });
        
      }
    }
  }

  return PageVbEnterChain1;
});
