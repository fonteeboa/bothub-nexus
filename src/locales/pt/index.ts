/**
 * Object containing Portuguese translations for various messages and notifications.
 * These translations are used to provide localized messages for different events.
 */
export const ptTranslations = {
  translation: {
    new_article: "📝 Novo artigo publicado: {{title}}\n{{url}}",
    new_repo: "📂 Novo repositório criado: {{name}}\n{{url}}",
    new_notification: "🔔 Nova notificação do GitHub:\n{{title}}\n{{url}}",
    new_bluesky_post: "🌐 Novo post no Blue Sky: {{content}}",
    repo_forked: "🍴 Repositório bifurcado: {{name}}",
    issue_created: "🐞 Nova issue criada: {{title}}",
    github_monitoring_started: "Serviços de monitoramento do GitHub iniciados.",
    github_service_disabled: "O serviço do GitHub está desativado. O monitoramento não será iniciado.",
    error_monitoring_posts: "Erro ao monitorar posts do Dev.to: {{error}}",
    devto_monitoring_started: "Serviço de monitoramento do Dev.to iniciado.",
    error_fetching_posts: "Erro ao obter posts do Dev.to: {{error}}",
    new_github_notification: "🔔 Nova notificação do GitHub:\n*{{subject.title}}*\n[Veja o Pull Request]({{subject.url}})\n\nAtualizado em: {{updated_at}}\nRepositório: [{{repository.full_name}}]({{repository.html_url}})\nPrivado: {{repository.private}}\nDescrição: {{repository.description}}",
    bot_started: "Bot iniciado com sucesso!",
    new_article_published: "📝 Novo artigo publicado: {{title}}\n{{url}}",
    new_repo_created: "📂 Novo repositório criado: {{name}}\n{{url}}",
    bluesky_post_success: "Conteúdo postado no Blue Sky com sucesso!",
    bluesky_post_error: "Erro ao postar no Blue Sky.",
    centralized_bot_error: "Erro ao iniciar o bot centralizado: {{error}}",
    user_permission_denied_bot: "Permissão negada. Você não tem permissão para usar este bot."
  }
};
