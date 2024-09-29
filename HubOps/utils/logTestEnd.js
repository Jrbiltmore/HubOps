
const fs = require('fs');
const path = require('path');

/**
 * Logs the end of the test execution process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logTestEnd(message) {
    const logFilePath = path.join(__dirname, '../logs/test_execution.log');
    const logMessage = `[END] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logTestEnd;
