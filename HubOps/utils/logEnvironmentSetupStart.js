
const fs = require('fs');
const path = require('path');

/**
 * Logs the start of the environment setup process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logEnvironmentSetupStart(message) {
    const logFilePath = path.join(__dirname, '../logs/environment_setup.log');
    const logMessage = `[START] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logEnvironmentSetupStart;
