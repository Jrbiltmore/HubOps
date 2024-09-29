
const fs = require('fs');
const { sendSlackNotification, sendEmailNotification } = require('../utils/notifications');
const { logValidationStart, logValidationEnd } = require('../utils/logger');

/**
 * Validates the pipeline configuration by checking for required fields and 
 * ensuring that each field adheres to a pre-defined schema.
 * 
 * @param {Object} projectConfig - The configuration object for the project
 */
async function validateConfig(projectConfig) {
    logValidationStart('Starting pipeline configuration validation.');

    try {
        // Basic validation: Ensure that all mandatory fields are present
        const requiredFields = ['name', 'version', 'repository', 'buildScript', 'deployScript'];
        for (let field of requiredFields) {
            if (!projectConfig[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Advanced validation: Ensure the repository URL is valid
        if (!isValidRepository(projectConfig.repository)) {
            throw new Error('Invalid repository URL.');
        }

        // Advanced validation: Check for specific environment settings
        if (!validateEnvironmentSettings(projectConfig.environmentSettings)) {
            throw new Error('Invalid environment settings.');
        }

        // Log the validation success
        logValidationEnd('Configuration validation completed successfully.');
        sendSlackNotification('Configuration validated successfully for ' + projectConfig.name);

    } catch (error) {
        // Send an email notification if validation fails
        sendEmailNotification('Configuration validation failed for ' + projectConfig.name, error.message);
        throw new Error('Configuration validation error: ' + error.message);
    }
}

/**
 * Validates the repository URL.
 * 
 * @param {String} repository - The repository URL to validate
 * @returns {Boolean} - True if the repository URL is valid, false otherwise
 */
function isValidRepository(repository) {
    const regex = /^(https?|git):\/\/[^\s$.?#].[^\s]*$/gm;
    return regex.test(repository);
}

/**
 * Validates the environment settings provided in the project configuration.
 * 
 * @param {Object} environmentSettings - The environment settings to validate
 * @returns {Boolean} - True if the environment settings are valid, false otherwise
 */
function validateEnvironmentSettings(environmentSettings) {
    if (!environmentSettings || typeof environmentSettings !== 'object') return false;

    const requiredEnvFields = ['NODE_ENV', 'PORT', 'DATABASE_URL'];
    for (let field of requiredEnvFields) {
        if (!environmentSettings[field]) {
            return false;
        }
    }

    return true;
}

module.exports = validateConfig;
