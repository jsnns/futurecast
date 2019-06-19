/**
 * given a list of data return a list of all keys
 * @param {Array<Object>} data
 */
export function getCsvKeys(data) {
  if (!(data instanceof Array)) {
    throw Error("getCsvKeys requires an array");
  }

  let keys = [];
  data.forEach(row => {
    for (let key in row) {
      if (keys.includes(key)) return;
      else keys.push(key);
    }
  });
  return keys;
}

/**
 * Transform an array of objects into a csv string
 * where keys are columns and rows are objects
 * @param {Array<Object>} data
 */
export function createCsvFromData(data) {
  const keys = sortKeys(getCsvKeys(data));
  const rows = data.map(row => {
    row = keys.map(key => {
      let value = row[key];
      if (value instanceof Date) return value.toDateString();
      return value || "";
    });
    return row.join(",");
  });

  return [keys.join(","), ...rows].join("\n");
}

/**
 * append the data type string to a csv
 * used to tell the browser to download the csv
 * @param {String} csv
 */
export function appendCsvFileType(csv) {
  return "data:text/csv;charset=utf-8," + csv;
}

/**
 * Sort keys so they make sense when opened in Excel
 * @param {Array<*>} keys
 */
export function sortKeys(keys) {
  const keyOrder = ["id", "display", "category", "subcategory"];
  return keys.sort((a, b) => {
    if (keyOrder.indexOf(a) === -1) return 1;
    if (keyOrder.indexOf(b) === -1) return -1;
    return keyOrder.indexOf(a) - keyOrder.indexOf(b);
  });
}

export default createCsvFromData;
