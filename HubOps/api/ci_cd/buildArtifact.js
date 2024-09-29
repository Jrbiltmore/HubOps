
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { logArtifactBuildStart, logArtifactBuildEnd } = require('../utils/logger');
const { sendSlackNotification, sendEmailNotification } = require('../utils/notifications');

/**
 * Builds the project artifact (e.g., .zip, .tar.gz) by packaging the codebase
 * and dependencies into a distributable format. The artifact is saved to the
 * designated directory.
 * 
 * @param {Object} projectConfig - The project configuration, including build commands
 * @param {String} artifactDirectory - The directory where the artifact should be stored
 */
async function buildArtifact(projectConfig, artifactDirectory) {
    logArtifactBuildStart('Starting build artifact process for ' + projectConfig.name);

    try {
        // Ensure the artifact directory exists
        if (!fs.existsSync(artifactDirectory)) {
            fs.mkdirSync(artifactDirectory, { recursive: true });
        }

        // Step 1: Run the build script to package the code
        runBuildScript(projectConfig.buildScript);
        sendSlackNotification('Build script executed successfully.');

        // Step 2: Package the built files into an artifact (e.g., zip or tarball)
        const artifactPath = packageArtifact(projectConfig.name, artifactDirectory);
        sendSlackNotification(`Artifact created: ${artifactPath}`);

        logArtifactBuildEnd('Build artifact process completed successfully.');

    } catch (error) {
        sendEmailNotification('Build artifact process failed for ' + projectConfig.name, error.message);
        throw new Error('Build artifact process failed: ' + error.message);
    }
}

/**
 * Runs the project's build script to compile the source code and prepare it
 * for packaging.
 * 
 * @param {String} buildScript - The command to run the build process
 */
function runBuildScript(buildScript) {
    if (buildScript) {
        execSync(buildScript, { stdio: 'inherit' });
    } else {
        throw new Error('No build script defined.');
    }
}

/**
 * Packages the built files into an artifact (e.g., .zip or .tar.gz) and stores
 * it in the artifact directory.
 * 
 * @param {String} projectName - The name of the project
 * @param {String} artifactDirectory - The directory where the artifact should be stored
 * @returns {String} - The path to the generated artifact
 */
function packageArtifact(projectName, artifactDirectory) {
    const artifactPath = path.join(artifactDirectory, `${projectName}.zip`);
    const command = `zip -r ${artifactPath} ./*`;  // Command to package the files into a .zip archive
    execSync(command, { stdio: 'inherit' });
    return artifactPath;
}

module.exports = buildArtifact;
