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

  class locationSelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      $variables.LocationTabObj.p_longitude = "";
      $variables.LocationTabObj.p_latitude = "";
      $variables.LocationTabObj.p_address_line1 = data.ADDRESS_LINE_1;
      $variables.LocationTabObj.p_country = data.COUNTRY;
      $variables.LocationTabObj.p_address_line2 = data.ADDRESS_LINE_2;
      $variables.LocationTabObj.p_city = data.TOWN_OR_CITY;
      $variables.LocationTabObj.p_zip = data.POSTAL_CODE;
    }
  }

  return locationSelectValueItemChangeChain;
});
