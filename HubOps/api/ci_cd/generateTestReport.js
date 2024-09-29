
const fs = require('fs');
const path = require('path');
const { logReportGenerationStart, logReportGenerationEnd } = require('../utils/logger');
const { sendSlackNotification, sendEmailNotification } = require('../utils/notifications');

/**
 * Generates a comprehensive test report summarizing the results of the test execution.
 * The report is saved to disk and can be sent to the relevant stakeholders.
 * 
 * @param {Array} testResults - An array of test results objects
 * @param {String} reportDirectory - The directory where the report should be saved
 * @param {String} projectName - The name of the project for which the report is generated
 */
async function generateTestReport(testResults, reportDirectory, projectName) {
    logReportGenerationStart('Generating test report.');

    try {
        const reportFilePath = path.join(reportDirectory, `${projectName}_test_report.json`);
        const reportData = {
            project: projectName,
            date: new Date().toISOString(),
            results: testResults
        };

        fs.writeFileSync(reportFilePath, JSON.stringify(reportData, null, 2));
        sendSlackNotification(`Test report generated for ${projectName}.`);

        logReportGenerationEnd('Test report generated successfully.');

    } catch (error) {
        sendEmailNotification('Failed to generate test report', error.message);
        throw new Error('Test report generation failed: ' + error.message);
    }
}

module.exports = generateTestReport;
