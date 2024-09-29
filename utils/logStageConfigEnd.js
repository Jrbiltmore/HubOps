
const fs = require('fs');
const path = require('path');

/**
 * Logs the end of the stage configuration process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logStageConfigEnd(message) {
    const logFilePath = path.join(__dirname, '../logs/stage_config.log');
    const logMessage = `[END] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logStageConfigEnd;
