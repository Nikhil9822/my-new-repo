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

  class salescontractButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });
      const currentTimestamp = await $functions.getCurrentTimestamp();

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getQuoteDetails2',
        uriParams: {
          'p_res_number': $variables.currentRow.rowData.rental_reservation_number,
        },
      });
      const calculateDaysBetweenUSFormat = await $functions.calculateDaysBetweenUSFormat($variables.currentRow.rowData.start_date, $variables.currentRow.rowData.end_date);
      const createRentalContract = await $functions.createRentalContract($variables.currentRow.rowData, response.body.items, "CB-Sell" + "-" + currentTimestamp, calculateDaysBetweenUSFormat + 1);
      const response2 = await Actions.callRest(context, {
        endpoint: 'Procurement_Module/postContracts',
        body: createRentalContract,
      });
      if (response2.ok) {

        const updateRentalContract = await $functions.updateRentalContract(response2.body.ContractId, response2.body.ContractLine);

        const response4 = await Actions.callRest(context, {
          endpoint: 'Procurement_Module/patchContractsContractId',
          uriParams: {
            ContractId: response2.body.ContractId,
          },
          body: updateRentalContract,
        });
        if (response4.ok) {

          let obj = {
            "p_contract_number": response2.body.ContractNumber,
            "p_rental_reservation_number": $variables.currentRow.rowData.rental_reservation_number
          };

          const response5 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postGetManagerQuoteDetails',
            body: obj,
          });

          if (response5.ok) {

            await Actions.fireNotificationEvent(context, {
              summary: 'Rental Contract Created',
              type: 'confirmation',
              displayMode: 'persist',
              message: response2.body.ContractNumber,
            });

            const actionpopupClose = await Actions.callComponentMethod(context, {
              selector: '#actionpopup',
              method: 'close',
            });

            await Actions.callChain(context, {
              chain: 'SearchButtonActionChain',
            });
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed To  Create Rental Contract',
              type: 'error',
              displayMode: 'transient',
            });

          }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Create  Rental Contract',
            type: 'error',
            displayMode: 'transient',
          });

        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Create Rental Contract',
          type: 'error',
          displayMode: 'transient',
        });

      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return salescontractButtonActionChain;
});
