
const fs = require('fs');
const path = require('path');

/**
 * Logs the start of fetching test cases from a repository or API.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logFetchTestCasesStart(message) {
    const logFilePath = path.join(__dirname, '../logs/fetch_test_cases.log');
    const logMessage = `[START] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logFetchTestCasesStart;
