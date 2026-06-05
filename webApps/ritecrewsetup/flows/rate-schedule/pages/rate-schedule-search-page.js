define([], () => {
  'use strict';

  class PageModule {
    saveRateSchedule(data, start, end) {
      let payload = {
        "bill_rate": data.bill_rate,
        "cost_rate": data.cost_rate,
        "currency": data.currency,
        "eqp_rate_row_detail_id": data.eqp_rate_row_detail_id,
        "equipment_resource_class": data.equipment_resource_class,
        "location": data.location,
        "non_labor_resource": data.non_labor_resource,
        "rate_schedule_name": data.rate_schedule_name,
        "rate_type_end_date": end,
        "rate_type_start_date": start,
        "rate_types": data.rate_types,
        "rounding_threshold": data.rounding_threshold,
        "uom": data.uom
      };
      return payload;
    }
  }
  return PageModule;
});
 