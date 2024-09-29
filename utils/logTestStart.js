
const fs = require('fs');
const path = require('path');

/**
 * Logs the start of the test execution process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logTestStart(message) {
    const logFilePath = path.join(__dirname, '../logs/test_execution.log');
    const logMessage = `[START] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logTestStart;
