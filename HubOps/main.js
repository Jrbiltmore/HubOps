
const fs = require('fs');
const path = require('path');

// Import functions from api/ci_cd
const initPipeline = require('./api/ci_cd/initPipeline');
const validateConfig = require('./api/ci_cd/validateConfig');
const setupEnvironment = require('./api/ci_cd/setupEnvironment');
const configureStages = require('./api/ci_cd/configureStages');
const runTests = require('./api/ci_cd/runTests');

// Import functions from api/security
const scanDependencies = require('./api/security/scanDependencies');
const generateReport = require('./api/security/generateReport');

// Import functions from frontend/components
const renderLogo = require('./frontend/components/renderLogo');
const renderLinks = require('./frontend/components/renderLinks');

// Import functions from backend/auth
const validateUser = require('./backend/auth/validateUser');

// Logger setup
const logger = fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' });

function logToFile(message) {
    logger.write(`${new Date().toISOString()} - ${message}\n`);
}

// Print and log function
function printAndLog(message) {
    console.log(message);
    logToFile(message);
}

// Function to generate a report and send it to the dashboard
function generateDashboardReport(results) {
    const report = {
        ci_cd: results.ci_cd,
        security: results.security,
        frontend: results.frontend,
        backend: results.backend,
    };
    // Simulate sending report to dashboard (in reality, this would send via API)
    printAndLog("Report generated for dashboard:");
    printAndLog(JSON.stringify(report, null, 2));
}

// Main function that runs all operations
async function runOperations() {
    const results = {
        ci_cd: {},
        security: {},
        frontend: {},
        backend: {},
    };

    // CI/CD Operations
    printAndLog("Starting CI/CD operations...");
    initPipeline();
    validateConfig();
    setupEnvironment();
    configureStages();
    runTests();
    results.ci_cd.status = "CI/CD operations completed successfully.";

    // Security Operations
    printAndLog("Starting Security operations...");
    scanDependencies();
    generateReport();
    results.security.status = "Security operations completed successfully.";

    // Frontend Operations
    printAndLog("Starting Frontend operations...");
    renderLogo();
    renderLinks();
    results.frontend.status = "Frontend operations completed successfully.";

    // Backend Operations
    printAndLog("Starting Backend operations...");
    validateUser("admin", "password");
    results.backend.status = "Backend operations completed successfully.";

    // Generate dashboard report
    generateDashboardReport(results);
}

// Execute all operations
runOperations()
    .then(() => printAndLog("All operations completed successfully."))
    .catch((error) => printAndLog(`Error occurred: ${error.message}`));
