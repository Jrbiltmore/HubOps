
const axios = require('axios');
const { logNotificationSend } = require('../utils/logger');

/**
 * Sends a notification via Slack to a specified channel or user.
 * 
 * @param {String} message - The message to send
 */
async function sendSlackNotification(message) {
    try {
        const webhookUrl = process.env.SLACK_WEBHOOK_URL;
        if (!webhookUrl) throw new Error('Slack webhook URL not set.');

        await axios.post(webhookUrl, {
            text: message
        });

        logNotificationSend(`Slack notification sent: ${message}`);
    } catch (error) {
        throw new Error(`Failed to send Slack notification: ${error.message}`);
    }
}

/**
 * Sends an email notification using a third-party email service.
 * 
 * @param {String} subject - The subject of the email
 * @param {String} body - The body/content of the email
 */
async function sendEmailNotification(subject, body) {
    try {
        const emailServiceUrl = process.env.EMAIL_SERVICE_URL;
        const apiKey = process.env.EMAIL_API_KEY;

        if (!emailServiceUrl || !apiKey) throw new Error('Email service URL or API key not set.');

        await axios.post(emailServiceUrl, {
            apiKey: apiKey,
            subject: subject,
            body: body
        });

        logNotificationSend(`Email notification sent: ${subject}`);
    } catch (error) {
        throw new Error(`Failed to send email notification: ${error.message}`);
    }
}

module.exports = {
    sendSlackNotification,
    sendEmailNotification
};
