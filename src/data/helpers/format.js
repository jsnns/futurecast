/**
 * Returns a string of given int with thousands seperators
 * @param {number} int
 * @returns {string} with thousands seperators
 */
export const addCommas = int => {
  let decimal = int.toString().split(".")[1];
  let number = int.toString().split(".")[0];
  let withCommas = (int > 0 ? "" : "-") + Math.abs(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimal) return `${withCommas}.${decimal}`;
  else return withCommas;
};


/**
 * Adds a dollar sign to a string
 * @param {any} int
 * @returns {string} '$' + int
 */
export const addSign = int => `$${int}`;

/**
 * Adds commas and a dollar sign
 * @param {number} int
 * @returns {string} currency formatted string
 */
export const toCurrency = int => addSign(addCommas(Number(Math.abs(int)).toFixed(2)));

