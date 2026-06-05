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

  class ShipOutBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $and, $eq, $functions } = context;


      await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const initialUpdatePayload = {
        'equipment_request_id': current.row.equipment_request_id,
        'equipment_id':current.row.equipment_id,
        'inspection_stage': 'Eqp Manager - Check Out',
        'eqp_master_status': 'EQP MANAGER INSPECTION',
      };



      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEQPInspectionApproval',
        body: initialUpdatePayload,
      });

      if (!response.ok) {
        await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });



        await Actions.fireNotificationEvent(context, {
          summary: 'Initial status update failed',
          displayMode: 'transient',
          type: 'error',
        });

        return;
      } else {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });
        let obj =
        {
          "Message": "FYI- Request No." + current.row.eqp_request_number + "  has been shipped by. " + $application.variables.user || $application.user.username,
          "TaskCreator": $application.variables.user || $application.user.username,
          "Role_Name": "OII Equipment Requestor"
        };

        const response2 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/postEQP_ORACLE_WORKLI_POPUP_NOTIFI1_0Report',
          body: obj,
        });

        const response7 = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_EMAIL_NOTIFICATI1_0TriggerEmailNotification',
          uriParams: {
            'p_request_number': current.row.eqp_request_number,
            pageId: $application.currentPage.id,
            'USER_NAME': $application.variables.user || $application.user.username,
            'Role_name': "OII Equipment Requestor JR",
          },
        });

        if (current.row.maintenance_asset_id) {
// debugger;
          const response8 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05AssetHierarchiesLOVAssetId2',
            uriParams: {
              AssetId: current.row.maintenance_asset_id,
            },
          });

          if (response8.ok) {

            const response9 = await Actions.callRest(context, {
              endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_ASSETMAINTENANCE1_0GetAssets',
              // requestTransformOptions: {
              //   filter: {
              //     op: '$eq',
              //     attribute: 'parent_asset_number',
              //     value: response8.body.ParentAssetNumber,
              //   },
              // },
              uriParams: {
                'p_asset_number': response8.body.ParentAssetNumber,
              },
            });

            if (response9.ok) {
              if (response9.body !== "" && response9.body !== undefined && response9.body !== "Unable to parse response as JSON, content type application/json : SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input") {
                if (response9.body.items.length > 0) {


                  const result = await $functions.getmatchedRecords(response9.body.items, response8.body.ParentAssetNumber, current.row.maintenance_asset_number);

                  if (result) {

                    const results3 = await ActionUtils.forEach(result, async (itm, indx) => {

                      const response6 = await Actions.callRest(context, {
                        endpoint: 'fusion_cloud/deleteFscmRestApiResources11_13_18_05InstalledBaseAssetsAssetIdChildRelationshipsRelationshipId',
                        uriParams: {
                          AssetId: response8.body.ParentAssetId,
                          RelationshipId: itm.RELATIONSHIP_ID,
                        },
                      });
                    }, { mode: 'serial' });
                  }
                }
              }
            }

          }

        }
        if (current.row.maintenance_asset_number) {

          if (current.row.inventory_location_flag === "Y") {

            let payload = {
              "OperatingOrganizationId": current.row.inventory_org_id,
              "CurrentLocationId": current.row.location_id,
              "CurrentLocationContext": "ORA_INTERNAL_LOCATION"
            };
            const response3 = await Actions.callRest(context, {
              endpoint: 'fusion_cloud/patchFscmRestApiResources11_13_18_05MaintenanceAssetsAssetId',
              uriParams: {
                AssetId: current.row.maintenance_asset_id,
              },
              body: payload,
            });

            const response4 = await Actions.callRest(context, {
              endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_ASSETMAINTENANCE1_0GetAssets',
              uriParams: {
                'p_asset_number': current.row.maintenance_asset_number,
              },
            });

            if (response4.ok) {

              if (response4.body !== "" && response4.body !== undefined && response4.body !== "Unable to parse response as JSON, content type application/json : SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input") {
                if (response4.body.items.length >= 1) {

                  const results2 = await ActionUtils.forEach(response4.body.items, async (item1, index1) => {

                    const response5 = await Actions.callRest(context, {
                      endpoint: 'fusion_cloud/patchFscmRestApiResources11_13_18_05MaintenanceAssetsAssetId',
                      uriParams: {
                        AssetId: item1.asset_id,
                      },
                      body: payload,
                    });
                  }, { mode: 'serial' });
                }

              }
            }
          }
        }
        await Actions.callChain(context, {
          chain: 'SearchBtnAction',
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        await Actions.fireNotificationEvent(context, {
          summary: 'Shipped Out Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }



      await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

    }
  }

  return ShipOutBtnAction;
});
