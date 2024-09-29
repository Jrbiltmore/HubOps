
const fs = require('fs');
const path = require('path');

/**
 * Logs the end of a pipeline process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logPipelineEnd(message) {
    const logFilePath = path.join(__dirname, '../logs/pipeline.log');
    const logMessage = `[END] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logPipelineEnd;
