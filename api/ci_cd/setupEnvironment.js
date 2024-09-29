
const { execSync } = require('child_process');
const { sendSlackNotification, sendEmailNotification } = require('../utils/notifications');
const { logEnvironmentSetupStart, logEnvironmentSetupEnd } = require('../utils/logger');

/**
 * Sets up the environment (Development, Staging, Production) by installing necessary
 * dependencies, setting up environment variables, and configuring the system.
 * 
 * @param {String} environment - The target environment (e.g., 'development', 'staging', 'production')
 */
async function setupEnvironment(environment) {
    logEnvironmentSetupStart(`Starting environment setup for ${environment}.`);

    try {
        // Install necessary dependencies based on environment
        installDependencies(environment);
        sendSlackNotification(`Dependencies installed for ${environment}.`);

        // Set up environment variables
        configureEnvironmentVariables(environment);
        sendSlackNotification(`Environment variables configured for ${environment}.`);

        // Run any custom setup scripts for the environment
        runCustomSetupScripts(environment);
        sendSlackNotification(`Custom setup scripts executed for ${environment}.`);

        logEnvironmentSetupEnd(`Environment setup completed successfully for ${environment}.`);

    } catch (error) {
        // Notify via email if environment setup fails
        sendEmailNotification(`Environment setup failed for ${environment}`, error.message);
        throw new Error(`Environment setup failed: ${error.message}`);
    }
}

/**
 * Installs necessary dependencies based on the environment.
 * 
 * @param {String} environment - The target environment
 */
function installDependencies(environment) {
    const command = `npm install --${environment}`;
    execSync(command, { stdio: 'inherit' });
}

/**
 * Configures environment variables based on the target environment.
 * 
 * @param {String} environment - The target environment
 */
function configureEnvironmentVariables(environment) {
    const envVars = {
        development: {
            NODE_ENV: 'development',
            DEBUG: 'true'
        },
        staging: {
            NODE_ENV: 'staging',
            DEBUG: 'false'
        },
        production: {
            NODE_ENV: 'production',
            DEBUG: 'false'
        }
    };

    const envConfig = envVars[environment] || envVars.development;
    for (let [key, value] of Object.entries(envConfig)) {
        process.env[key] = value;
    }
}

/**
 * Runs custom setup scripts specific to the target environment.
 * 
 * @param {String} environment - The target environment
 */
function runCustomSetupScripts(environment) {
    const scripts = {
        development: './scripts/setup-dev.sh',
        staging: './scripts/setup-staging.sh',
        production: './scripts/setup-prod.sh'
    };

    const script = scripts[environment];
    if (script) {
        execSync(`bash ${script}`, { stdio: 'inherit' });
    }
}

module.exports = setupEnvironment;
