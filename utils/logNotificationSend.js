
const fs = require('fs');
const path = require('path');

/**
 * Logs the details of a notification being sent (Slack, Email, etc.) to a log file.
 * 
 * @param {String} message - The log message to write to the log file
 */
function logNotificationSend(message) {
    const logFilePath = path.join(__dirname, '../logs/notifications.log');
    const logMessage = `[NOTIFICATION] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
}

module.exports = logNotificationSend;
