import { octokit } from './githubService';
import EventEmitterUtil from '../../utils/eventEmitter';
import { config } from '../../config';
import { calculateDiffHours } from '../../utils/helpers';

/**
 * Asynchronous function that monitors GitHub repositories for a specified user.
 * Uses the GitHub API to list repositories and emits events for newly created repositories.
 */
export const monitorRepos = async () => {
    try {
        // Retrieve the GitHub username from the configuration
        const username = config.github.username;

        // If the username is not set, exit the function early
        if (!username) {
            return false;
        }

        // Fetch the list of repositories for the specified user using the GitHub API
        const repos = await octokit.repos.listForUser({ username: username });

        // Iterate over each repository received
        repos.data.forEach((repo: any) => {
            // Check if the repository was recently created using the calculateDiffHours function
            if (calculateDiffHours(repo.created_at)) {
                // Emit an event for each newly created repository
                EventEmitterUtil.emit('github:newRepo', repo);
            }
        });
    } catch (error) {
        // Log an error to the console if there is an issue monitoring GitHub repositories
        console.error('Error monitoring GitHub repositories:', error);
    }
};