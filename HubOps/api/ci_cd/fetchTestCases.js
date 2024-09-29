
const { logFetchTestCasesStart, logFetchTestCasesEnd } = require('../utils/logger');
const { sendSlackNotification, sendEmailNotification } = require('../utils/notifications');
const axios = require('axios');

/**
 * Fetches test cases from a remote repository or a test management system,
 * ensuring that the latest test cases are used for the CI/CD pipeline.
 * 
 * @param {String} testCaseRepository - The URL of the remote test case repository or API
 * @param {Object} authCredentials - Authentication credentials for accessing the repository
 */
async function fetchTestCases(testCaseRepository, authCredentials) {
    logFetchTestCasesStart('Fetching test cases from repository.');

    try {
        const response = await axios.get(testCaseRepository, {
            headers: {
                'Authorization': `Bearer ${authCredentials.token}`
            }
        });

        if (response.status === 200 && response.data) {
            logFetchTestCasesEnd('Test cases fetched successfully.');
            sendSlackNotification('Test cases fetched successfully from repository.');
            return response.data;
        } else {
            throw new Error('Failed to fetch test cases.');
        }

    } catch (error) {
        sendEmailNotification('Failed to fetch test cases', error.message);
        throw new Error('Fetch test cases error: ' + error.message);
    }
}

module.exports = fetchTestCases;
