
const { execSync } = require('child_process');
const { sendSlackNotification, sendEmailNotification } = require('../utils/notifications');
const { logTestStart, logTestEnd } = require('../utils/logger');

/**
 * Runs the test suite for the project, including unit tests, integration tests,
 * and code coverage checks. Test results are logged and notifications are sent
 * for pass/fail statuses.
 * 
 * @param {Object} projectConfig - The project configuration, which includes test scripts and settings
 */
async function runTests(projectConfig) {
    logTestStart('Starting tests for ' + projectConfig.name);

    try {
        // Step 1: Run unit tests
        runUnitTests(projectConfig.testScripts.unit);
        sendSlackNotification('Unit tests completed successfully.');

        // Step 2: Run integration tests
        runIntegrationTests(projectConfig.testScripts.integration);
        sendSlackNotification('Integration tests completed successfully.');

        // Step 3: Run code coverage check
        runCodeCoverage(projectConfig.testScripts.coverage);
        sendSlackNotification('Code coverage check completed successfully.');

        logTestEnd('All tests completed successfully for ' + projectConfig.name);

    } catch (error) {
        // Send email if any test fails
        sendEmailNotification('Test suite failed for ' + projectConfig.name, error.message);
        throw new Error('Test suite failed: ' + error.message);
    }
}

/**
 * Runs the unit tests defined in the project configuration.
 * 
 * @param {String} unitTestScript - The script to run the unit tests
 */
function runUnitTests(unitTestScript) {
    if (unitTestScript) {
        execSync(unitTestScript, { stdio: 'inherit' });
    } else {
        throw new Error('No unit test script defined.');
    }
}

/**
 * Runs the integration tests defined in the project configuration.
 * 
 * @param {String} integrationTestScript - The script to run the integration tests
 */
function runIntegrationTests(integrationTestScript) {
    if (integrationTestScript) {
        execSync(integrationTestScript, { stdio: 'inherit' });
    } else {
        throw new Error('No integration test script defined.');
    }
}

/**
 * Runs the code coverage check as defined in the project configuration.
 * 
 * @param {String} coverageScript - The script to run the code coverage check
 */
function runCodeCoverage(coverageScript) {
    if (coverageScript) {
        execSync(coverageScript, { stdio: 'inherit' });
    } else {
        throw new Error('No code coverage script defined.');
    }
}

module.exports = runTests;
