/**
 * Object containing English translations for various messages and notifications.
 * These translations are used to provide localized messages for different events.
 */
export const enTranslations = {
  translation: {
    new_article: "📝 New article published: {{title}}\n{{url}}",
    new_repo: "📂 New repository created: {{name}}\n{{url}}",
    new_notification: "🔔 New GitHub notification:\n{{title}}\n{{url}}",
    new_bluesky_post: "🌐 New post on Blue Sky: {{content}}",
    repo_forked: "🍴 Repository forked: {{name}}",
    issue_created: "🐞 New issue created: {{title}}",
    github_monitoring_started: "GitHub monitoring services started.",
    github_service_disabled: "GitHub service is disabled. Monitoring will not start.",
    error_monitoring_posts: "Error monitoring Dev.to posts: {{error}}",
    devto_monitoring_started: "Dev.to monitoring service started.",
    error_fetching_posts: "Error fetching Dev.to posts: {{error}}",
    new_github_notification: "🔔 New GitHub Notification:\n*{{subject.title}}*\n[Link to the Pull Request]({{subject.url}})\n\nUpdated at: {{updated_at}}\nRepository: [{{repository.full_name}}]({{repository.html_url}})\nPrivate: {{repository.private}}\nDescription: {{repository.description}}",
    bot_started: "Bot started successfully!",
    new_article_published: "📝 New article published: {{title}}\n{{url}}",
    new_repo_created: "📂 New repository created: {{name}}\n{{url}}",
    bluesky_post_success: "Content successfully posted to Blue Sky!",
    bluesky_post_error: "Error posting to Blue Sky.",
    centralized_bot_error: "Error initializing the centralized bot: {{error}}",
    user_permission_denied_bot: "Permission denied. You do not have permission to use this bot."
  }
};
