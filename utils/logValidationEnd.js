
const fs = require('fs');
const path = require('path');

/**
 * Logs the end of a validation process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logValidationEnd(message) {
    const logFilePath = path.join(__dirname, '../logs/validation.log');
    const logMessage = `[END] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logValidationEnd;
