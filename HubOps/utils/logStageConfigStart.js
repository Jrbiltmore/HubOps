
const fs = require('fs');
const path = require('path');

/**
 * Logs the start of the stage configuration process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logStageConfigStart(message) {
    const logFilePath = path.join(__dirname, '../logs/stage_config.log');
    const logMessage = `[START] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logStageConfigStart;
