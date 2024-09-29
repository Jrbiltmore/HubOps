
const validateConfig = require('./validateConfig');
const setupEnvironment = require('./setupEnvironment');
const configureStages = require('./configureStages');
const { runPreBuildChecks, checkDependencies } = require('../security/scanDependencies');
const { sendSlackNotification, sendEmailNotification } = require('../utils/notifications');
const { logPipelineStart, logPipelineEnd } = require('../utils/logger');
const fs = require('fs');
const path = require('path');

async function initPipeline(projectConfig, environment, pipelineStages) {
    try {
        logPipelineStart('CI Pipeline initialized for project: ' + projectConfig.name);

        // Step 1: Validate the pipeline configuration
        await validateConfig(projectConfig);
        sendSlackNotification('Pipeline configuration validated successfully.');

        // Step 2: Set up the environment (Dev, Staging, Prod)
        await setupEnvironment(environment);
        sendSlackNotification('Environment setup completed.');

        // Step 3: Pre-build checks
        await runPreBuildChecks();
        sendSlackNotification('Pre-build checks completed.');

        // Step 4: Check dependencies and system requirements
        await checkDependencies(projectConfig);
        sendSlackNotification('All dependencies verified.');

        // Step 5: Configure the pipeline stages (Build, Test, Deploy)
        await configureStages(pipelineStages);
        sendSlackNotification('Pipeline stages configured successfully.');

        // Step 6: Initiate pipeline artifact directories and metadata files
        const artifactDir = path.join(__dirname, 'artifacts', projectConfig.name);
        if (!fs.existsSync(artifactDir)) {
            fs.mkdirSync(artifactDir, { recursive: true });
        }

        const metadataFile = path.join(artifactDir, 'pipeline_metadata.json');
        fs.writeFileSync(metadataFile, JSON.stringify({
            project: projectConfig.name,
            environment,
            stages: pipelineStages,
            status: 'Initialized'
        }));

        logPipelineEnd('Pipeline initialized successfully for ' + projectConfig.name);
        sendSlackNotification('Pipeline initialization complete.');
    } catch (error) {
        sendEmailNotification('Pipeline failed for ' + projectConfig.name, error.message);
        throw new Error('Pipeline initialization failed: ' + error.message);
    }
}

module.exports = initPipeline;
