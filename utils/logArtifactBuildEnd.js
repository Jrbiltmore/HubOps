
const fs = require('fs');
const path = require('path');

/**
 * Logs the end of the artifact build process to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logArtifactBuildEnd(message) {
    const logFilePath = path.join(__dirname, '../logs/artifact_build.log');
    const logMessage = `[END] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logArtifactBuildEnd;
