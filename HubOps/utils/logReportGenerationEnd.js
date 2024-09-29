
const fs = require('fs');
const path = require('path');

/**
 * Logs the end of the report generation process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logReportGenerationEnd(message) {
    const logFilePath = path.join(__dirname, '../logs/report_generation.log');
    const logMessage = `[END] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logReportGenerationEnd;
