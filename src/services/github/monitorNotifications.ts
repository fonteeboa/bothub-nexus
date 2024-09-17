import { octokit } from './githubService';
import EventEmitter from '../../utils/eventEmitter';
import { calculateDiffHours } from '../../utils/helpers';

/**
 * Asynchronous function that monitors GitHub notifications and starred repositories for the authenticated user.
 * Uses the GitHub API to list notifications and emits events for new notifications and starred repository updates.
 */
export const monitorNotifications = async () => {
    try {
        // Array to store notifications and starred repo events that need to be processed
        const notificationsToProcess: any[] = [];
        // Fetch the list of notifications for the authenticated user using the GitHub API
        const notificationsData = await octokit.rest.activity.listNotificationsForAuthenticatedUser();
        // Iterate over each received notification
        notificationsData.data.forEach((notification: any) => {
            // Check if the notification was recently updated using the calculateDiffHours function
            if (calculateDiffHours(notification.updated_at)) {
                // Add the notification to the array of notifications to be processed
                notificationsToProcess.push(notification);
            }
        });

        // Variables for pagination
        let page = 1;
        let per_page = 100;
        let hasMoreRepos = true;

        // Iterate while there are more repositories to fetch
        while (hasMoreRepos) {
            // Fetch the starred repositories on the current page
            const starredRepos = await octokit.rest.activity.listReposStarredByAuthenticatedUser({
                per_page: per_page,
                page: page
            });

            // If there are no more repositories, stop the loop
            if (starredRepos.data.length === 0) {
                hasMoreRepos = false;
                continue;
            }
            // Iterate over each repository to fetch recent releases
            for (const repo of starredRepos.data) {
                try {
                    // Fetch the list of releases for the repository
                    const releases = await octokit.rest.repos.listReleases({
                        owner: repo.owner.login,
                        repo: repo.name,
                        per_page: 100
                    });

                    // Iterate over the releases and check if they are recent
                    releases.data.forEach((release: any) => {
                        if (calculateDiffHours(release.published_at)) {
                            const releaseMessage = {
                                subject: {
                                    title: release.name,
                                    url: release.html_url
                                },
                                updated_at: release.published_at,
                                repository: {
                                    full_name: repo.full_name,
                                    html_url: repo.html_url,
                                    private: repo.private,
                                    description: release.body || ''
                                },
                                subject_url: release.html_url,
                                description: release.body || ''
                            };
                            // Add the release to the array of notifications to be processed
                            notificationsToProcess.push(releaseMessage);
                        }
                    });
                } catch (error) {
                    console.error(`Error fetching releases for repository ${repo.full_name}:`, error);

                }
            }
            page++;
        }

        // Emit an event for each new processed notification
        notificationsToProcess.forEach((notification: any) => {
            EventEmitter.emit('github:notification', notification);
        });

    } catch (error) {
        // Log an error to the console if there is an issue fetching GitHub notifications or starred repo events
        console.error('Error fetching GitHub notifications or starred repo events:', error);
    }
};
