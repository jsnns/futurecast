/**
 * Returns a string of given int with thousands seperators
 * @param {number} int
 * @returns {string} with thousands seperators
 */
export const addCommas = int => {
    let decimal = int.toString().split(".")[1];
    let number = int.toString().split(".")[0];
    let withCommas = (int >= 0 ? "" : "-") + Math.abs(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimal) return `${withCommas}.${decimal}`;
    else return withCommas;
};

function moneyFormat(labelValue) {
    // Nine Zeroes for Billions
    let value = Math.abs(Number(labelValue));
    return value >= 1.0e+9
        ? (value / 1.0e+9).toPrecision(3) + "b"

        // Six Zeroes for Millions
        : value >= 1.0e+6

            ? (value / 1.0e+6).toPrecision(3) + "m"
            // Three Zeroes for Thousands

            : value >= 1.0e+3
                ? (value / 1.0e+3).toPrecision(3) + "k"
                : value;
}

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
export const toCurrency = int => addSign(moneyFormat(Number(Math.abs(int)).toFixed(0)));

