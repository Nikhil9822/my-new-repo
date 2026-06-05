define(["ojs/ojarraytreedataprovider", "flatter"], (ArrayTreeDataProvider, FlattenedTreeDataProviderView) => {
  'use strict';

  class PageModule {

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate;
    }


    date(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    


// getMonthsData(data, childdata) {
//   if (!data) return [];
//   let monthsData = [];
//   let idCounter = 1;
//   const formatDate = (isoDate) => {
//     const d = new Date(isoDate);
//     return d.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric'
//     }); // Jan 1
//   };
//   data.forEach(item => {
//     const obj = {
//       Component: item.month_label,
//       id: idCounter++,
//       children: []
//     };
//     if (item.business_unit) {
//       const safeKey = item.business_unit.replace(/\s+/g, '_');
//       obj[`${safeKey}_Total`] = String(item.total_equipment);
//       obj[`${safeKey}_Units`] = item.util_percent + '%';
//     }
//     // Attach children rows
//     if (childdata && childdata.length) {
//       obj.children = childdata
//         .filter(c => c.month_label === item.month_label)
//         .map(c => {
//           const safeBU = c.business_unit.replace(/\s+/g, '_');
//           const childObj = {
//             id: idCounter++,
//             Component: formatDate(c.day_date)
//           };
//           childObj[`${safeBU}_Total`] = String(c.total_equipment);
//           childObj[`${safeBU}_Units`] = c.util_percent + '%';
//           return childObj;
//         });
//     }
//     monthsData.push(obj);
//   });
//   return monthsData;
// };
getMonthsData(data, childdata, flag) {
  if (!data) return [];

  let idCounter = 1;

  const normalizeMonth = m =>
    m ? m.replace(/[\s-]/g, '').toUpperCase() : '';

  const formatDate = isoDate => {
    const d = new Date(isoDate);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const utilField =
    flag === 'hour'
      ? 'hour_util_percent'
      : 'day_util_percent';

  const percent = v => (v == null ? 0 : v) + '%';
  const numberVal = v => (v == null ? '0' : String(v));

  const monthMap = {};

  data.forEach(item => {
    const monthKey = item.month_label;
    const bu = item.business_unit;

    if (!monthMap[monthKey]) {
      monthMap[monthKey] = {
        Component: monthKey,
        id: idCounter++,
        children: []
      };
    }

    const row = monthMap[monthKey];
    const equipCol = `${bu} Equipment Count`;
    const hoursCol = `${bu} Utilized Hours`;
    const utilCol  = `${bu} Utilized %`;

    row[equipCol] = numberVal(item.total_equipment);
    row[hoursCol] = numberVal(item.month_used_hours);
    row[utilCol]  = percent(item[utilField]);
  });

  if (childdata && childdata.length) {
    childdata.forEach(c => {
      const parentMonth = c.month_label;
      const parentRow = monthMap[parentMonth];
      if (!parentRow) return;

      const dayLabel = formatDate(c.day_date);
      const bu = c.business_unit;

      let dayRow = parentRow.children.find(
        ch => ch.Component === dayLabel
      );
      if (!dayRow) {
        dayRow = {
          id: idCounter++,
          Component: dayLabel
        };
        parentRow.children.push(dayRow);
      }

      const equipCol = `${bu} Equipment Count`;
      const hoursCol = `${bu} Utilized Hours`;
      const utilCol  = `${bu} Utilized %`;

      dayRow[equipCol] = numberVal(c.total_equipment);
      dayRow[hoursCol] = numberVal(c.total_used_hours);
      dayRow[utilCol]  = percent(c[utilField]);
    });
  }

  Object.values(monthMap).forEach(row => {
    row.children.sort((a, b) => {
      return new Date(a.Component + ' 2026') - new Date(b.Component + ' 2026');
    });
  });

  return Object.values(monthMap);
}

//   getMonthColumns(data) {
//   if (!data || !data.length) return [];
//   const columnSet = new Set();
//   data.forEach(row => {
//     Object.keys(row).forEach(key => {
//       if (key !== 'children' && key !== 'id') {
//         columnSet.add(key);
//       }
//     });
//   });

//   const columns = Array.from(columnSet);

//   return columns.map((col, index) => ({
//     headerText: col.replaceAll('_', ' '),
//     field: col,
//     template: index === 0 ? 'treeCellTemplate' : 'cellTemplate'
//   }));
// };
getMonthColumns(data) {
  if (!data || !data.length) return [];
  const columnSet = new Set();

  data.forEach(row => {
    Object.keys(row).forEach(key => {
      if (key !== 'children' && key !== 'id') {
        columnSet.add(key);
      }
    });

    // Also scan children for any columns not in parent
    if (row.children && row.children.length) {
      row.children.forEach(child => {
        Object.keys(child).forEach(key => {
          if (key !== 'children' && key !== 'id') {
            columnSet.add(key);
          }
        });
      });
    }
  });

  const columns = Array.from(columnSet);

  return columns.map((col, index) => ({
    headerText: col.replaceAll('_', ' '),
    field: col,
    template: index === 0 ? 'treeCellTemplate' : 'cellTemplate'
  }));
}
removeNullfromData(data){
  if(data){
    let monData=[];
    data.forEach((itm)=>{
      if(itm.business_unit){
        monData.push(itm)
      }
    });
    return monData;
  }
};
   

    getUtilChartData(item) {
      if(item){
      const result = [];
      let idx = 0;
      Object.keys(item).forEach(key => {
        if (key.endsWith("Utilized %")) {
          const seriesName = key.replace("Utilized %", "");
          result.push({
            id: idx++,
            series: seriesName,
            group: item.Component,
            value: Number(item[key].replace("%", ""))
          });
        }
      });
      return result;
      }
    };

    getUtilChartDataPageload(data) {
      if(data){
      const result = [];
      let idx = 0;
      data.forEach(item => {
        Object.keys(item).forEach(key => {
          if (key.endsWith("Utilized %")) {
            result.push({
              id: idx++,
              series: key.replace("Utilized %", ""),
              group: item.Component,
              value: Number(item[key].replace("%", ""))
            });
          }
        });
      });
      return result;
      }
    };



    getFilterTreeDataProvider(data) {
      if (data) {
        let arrayTreeDataProvider = new ArrayTreeDataProvider(data, {
          keyAttributes: "id"
        });
        return new FlattenedTreeDataProviderView(arrayTreeDataProvider);
      }
    }


    columnsheaderGenerator(myrestdata) {
      let restdata = JSON.parse(myrestdata);

      // Function to format header text from field names like 'effective_start_date' to 'Effective Start Date'
      function formatHeaderText(field) {
        return field
          .replace(/_/g, ' ')  // Replace underscores with spaces
          .split(' ')  // Split by spaces
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
          .join(' ');  // Join back into a single string
      }

      if (Array.isArray(restdata)) {
        // If data is an array, handle objects inside the array
        if (restdata.length > 0 && typeof restdata[0] === 'object') {
          const headers = Object.keys(restdata[0]);

          const validColumns = headers.filter(field => {
            return restdata.some(item => item[field] !== null && item[field] !== "") &&
              field !== 'report_name' && field !== 'equipment_id';
          });

          // Map valid columns to formatted headers
          const columns = validColumns.map(field => {
            const column = {
              "headerText": formatHeaderText(field),
              "field": field
            };

            // Add specific properties for date fields
            if (field === "effective_start_date" || field === "effective_end_date") {
              column["template"] = "date";
            }

            return column;
          });

          return columns;
        } else {
          throw new Error("Array elements are not objects.");
        }
      } else if (typeof restdata === 'object') {
        // If data is an object, handle it directly
        const headers = Object.keys(restdata);

        const validColumns = headers.filter(field => {
          return restdata[field] !== null && restdata[field] !== "" &&
            field !== 'report_name' && field !== 'equipment_id';
        });

        // Map valid columns to formatted headers
        const columns = validColumns.map(field => ({
          "headerText": formatHeaderText(field),
          "field": field
        }));

        return columns;
      } else {
        throw new Error("Expected data to be an object or array of objects.");
      }
    }



    // csvdownload(mydata, filename) {
    //   let data = JSON.parse(mydata)

    //   let keys = Object.keys(data[0]);


    //   let headers = keys.map(function (key) {

    //     return key.replace(/_/g, ' ').replace(/\b\w/g, function (char) {
    //       return char.toUpperCase();
    //     });
    //   });
    //   let result = '';
    //   result += headers.join(',');
    //   result += '\n';
    //   data.forEach(function (item) {
    //     keys.forEach(function (key) {
    //       result += item[key] + ',';
    //     });
    //     result += '\n';
    //   });
    //   let csv = 'data:text/csv;charset=utf-8,' + result;
    //   let excel = encodeURI(csv);
    //   let link = document.createElement('a');
    //   link.setAttribute('href', excel);
    //   link.setAttribute('download', filename + '.csv');
    //   link.click();
    // }

 csvdownload(mydata, filename, fromDate, toDate) {
  // 1) Parse data
  const data = Array.isArray(mydata) ? mydata : JSON.parse(mydata || "[]");
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("csvdownload: no data");
    return;
  }

  // 2) Build dynamic keys (exclude empty columns + specific fields)
  const allKeys = Object.keys(
    data.reduce((acc, row) => Object.assign(acc, row || {}), {})
  );

  const keys = allKeys.filter((key) => {
    if (key === "report_name" || key === "equipment_id") return false;
    // keep column if at least one non-null/non-empty value exists
    return data.some((item) => {
      const v = item?.[key];
      return v !== null && v !== undefined && String(v) !== "";
    });
  });

  // 3) Build headers: From/To + title-cased keys
  const headers = [
    "From Date",
    "To Date",
    ...keys.map((key) =>
      key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    ),
  ];

  // 4) CSV escape helper (wrap in quotes if needed and escape quotes)
  const csvEscape = (val) => {
    // normalize undefined/null
    let v = val === null || val === undefined ? "" : String(val);
    // Excel/CSV best practice: always quote, or at least when needed.
    // We'll quote when the value contains comma, quote, newline, or leading/trailing spaces.
    const mustQuote = /[",\n\r]|^\s|\s$/.test(v);
    if (v.includes('"')) v = v.replace(/"/g, '""');
    return mustQuote ? `"${v}"` : v;
  };

  // 5) Normalize date display to avoid commas OR quote them
  // Option A: Keep your display but quote them via csvEscape below.
  // Option B: Use ISO (no commas) -> uncomment if you prefer no commas
  // const normalizeDate = (d) => d ? new Date(d).toISOString().slice(0, 10) : "";
  const normalizeDate = (d) => d ?? ""; // keep as provided; csvEscape will quote it

  // 6) Build CSV rows
  const lines = [];

  // Header line
  lines.push(headers.map(csvEscape).join(","));

  // Data lines
  for (const item of data) {
    const row = [];
    // From/To at the start
    row.push(csvEscape(normalizeDate(fromDate)));
    row.push(csvEscape(normalizeDate(toDate)));
    // Dynamic fields
    for (const key of keys) {
      const value = item && Object.prototype.hasOwnProperty.call(item, key)
        ? item[key]
        : "";
      row.push(csvEscape(value));
    }
    lines.push(row.join(","));
  }

  // 7) Join with CRLF (Excel-friendly)
  const csvContent = lines.join("\r\n");

  // 8) Download via Blob (reliable for large files & special chars)
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename || "export"}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

//new



    pieChartData(mydata) {
      let equipmentArray = JSON.parse(mydata);
      let equipmentCount = {};

      equipmentArray.forEach(item => {
        const equipmentClass = item.equipment_class;
        const equipmentName = item.equipment_name;


        const key = equipmentClass || equipmentName;


        if (equipmentCount[key]) {
          equipmentCount[key]++;
        } else {
          equipmentCount[key] = 1;
        }
      });
      let items = [];
      let newID = 1;
      for (let key in equipmentCount) {
        items.push({
          id: newID++,
          group: 'Equipment',
          series: key,
          value: equipmentCount[key]
        });
      }

      return items;
    }

  }

  return PageModule;
});
