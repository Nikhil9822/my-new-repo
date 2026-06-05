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

  class AddToCartClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.current 
     */
    async run(context, { current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if (true) {
        /*Nikhil's Changes Starts
        */
        $variables.equplatitude = current.latitude;
        $variables.equplongitude= current.longitude;
/*Nikhil's Changes  Ends
        */
        let currentRecord ={...current};
        if(!currentRecord.equip_req_quantity){
          currentRecord.equip_req_quantity= 1;
        }
        const cartAddition = await $functions.cartAddition(currentRecord, JSON.stringify($variables.CartArray));

        $variables.CartArray = cartAddition;

        await Actions.fireNotificationEvent(context, {
          summary: current.equipment_name +" "+ "has been added to Cart Successfully",
          displayMode: 'transient',
          type: 'info',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please select an Equipment Class to add the items to cart',
          displayMode: 'transient',
          type: 'info',
        });
        
      }


    }
  }

  return AddToCartClickAction;
});
