
const { execSync } = require('child_process');
const { logTestExecutionStart, logTestExecutionEnd } = require('../utils/logger');
const { sendSlackNotification, sendEmailNotification } = require('../utils/notifications');

/**
 * Executes the fetched test cases by running them in the test environment.
 * The results are captured and logged. Notifications are sent for pass/fail statuses.
 * 
 * @param {Array} testCases - The list of test cases to execute
 * @param {String} testEnvironment - The environment in which to run the tests (e.g., 'staging', 'production')
 */
async function executeTests(testCases, testEnvironment) {
    logTestExecutionStart(`Starting test execution in ${testEnvironment}.`);

    try {
        // Iterate through each test case and execute it
        for (let testCase of testCases) {
            runTestCase(testCase);
            sendSlackNotification(`Test case executed: ${testCase.name}`);
        }

        logTestExecutionEnd(`Test execution completed in ${testEnvironment}.`);

    } catch (error) {
        sendEmailNotification('Test execution failed', error.message);
        throw new Error('Test execution error: ' + error.message);
    }
}

/**
 * Executes a single test case by running its associated command or script.
 * 
 * @param {Object} testCase - The test case object containing the name and execution command
 */
function runTestCase(testCase) {
    try {
        if (testCase.command) {
            execSync(testCase.command, { stdio: 'inherit' });
        } else {
            throw new Error(`No execution command defined for test case: ${testCase.name}`);
        }
    } catch (error) {
        throw new Error(`Failed to execute test case: ${testCase.name} - ${error.message}`);
    }
}

module.exports = executeTests;
