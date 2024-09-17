import { Octokit } from '@octokit/rest';
import { config } from '../../config';

/**
 * Creates an instance of the Octokit class, which is used to interact with the GitHub API.
 * The instance is authenticated using a token from the configuration file.
 */
export const octokit = new Octokit({ auth: config.github.token });