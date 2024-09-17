# 🧩 Bothub Nexus

For the English version of this README, click [here](README_EN.md).

## 🌐 Visão Geral do Projeto

**Bothub Nexus** é um **sistema de monitoramento e notificações** abrangente, projetado para rastrear atividades em várias plataformas, incluindo **GitHub**, **Dev.to** e **Blue Sky**. Ao buscar dados dessas plataformas via suas APIs, ele processa e transmite notificações para um **bot do Telegram**. O projeto é construído usando **TypeScript** e utiliza uma variedade de bibliotecas e serviços para fornecer monitoramento em tempo real e capacidades de postagem.

## 🔑 Principais Funcionalidades

### Monitoramento do GitHub

- Monitora notificações e repositórios para o usuário autenticado.
- Busca as releases recentes dos repositórios.
- Emite eventos para novas notificações e repositórios.

### Monitoramento do Dev.to

- Busca postagens do usuário especificado.
- Itera sobre cada postagem e verifica se foi publicada recentemente usando `calculateDiffHours`.
- Emite eventos para novas postagens publicadas.

### Postagens no Blue Sky

- Publica atualizações no Blue Sky via o comando **`/post`** no Telegram.
- Autentica no Blue Sky usando as credenciais do usuário.
- Envia mensagens para o Telegram após a postagem bem-sucedida.

### Integração com o Bot do Telegram

- Recebe comandos e mensagens dos usuários.
- Publica no **Blue Sky** via **Telegram** usando o comando `/post`.
- Transmite notificações e atualizações para os IDs de chat configurados.
- Suporta localização para **Inglês** e **Português**.

### Localização

**Bothub Nexus** oferece suporte à localização em **Inglês** e **Português** via **i18next**. Os arquivos de tradução estão localizados no diretório `locales`, e as configurações de localização são inicializadas em `i18n.ts`.

## 🛠 Detalhes Técnicos

### Configuração

Bothub Nexus usa **variáveis de ambiente** para gerenciar as configurações. Essas configurações são carregadas de um arquivo `.env` usando o pacote **dotenv**. A configuração inclui chaves de API, nomes de usuário e outras credenciais necessárias para os serviços monitorados.

## 📂 Estrutura do Projeto

```bash
bothutb-nexus
├── src
│   ├── bots
│   │   ├── blueSky
│   │   │   ├── controllers
│   │   │   └── services
│   │   ├── telegram
│   │   │   ├── controllers
│   │   │   └── services
│   ├── config
│   ├── controllers
│   │   ├── devto
│   │   └── github
│   ├── listeners
│   ├── locales
│   │   ├── en
│   │   └── pt
│   ├── services
│   │   ├── devto
│   │   └── github
│   ├── test
│   │   ├── mocks
│   │   └── src
│   └── utils
```

### Descrição dos Diretórios
  
- **src/bots**:
  - **blueSky**: Diretório para lógica relacionada à plataforma Blue Sky.
    - **controllers**: Controladores para gerenciar interações e posts no Blue Sky.
    - **services**: Serviços que fazem as requisições à API do Blue Sky.
  - **telegram**: Diretório para a integração com o Telegram Bot.
    - **controllers**: Controladores que gerenciam os comandos recebidos pelo bot no Telegram.
    - **services**: Serviços que lidam com as requisições da API do Telegram.

- **src/config**: Arquivos de configuração usados em todo o projeto.

- **src/controllers**:
  - **devto**: Controladores responsáveis por monitorar e processar postagens no Dev.to.
  - **github**: Controladores que monitoram notificações e releases do GitHub.

- **src/listeners**: Configurações de listeners para capturar eventos e responder a ações no sistema.

- **src/locales**:
  - **en**: Arquivos de tradução para inglês.
  - **pt**: Arquivos de tradução para português.

- **src/services**:
  - **devto**: Serviços para comunicação com a API do Dev.to.
  - **github**: Serviços que fazem a comunicação com a API do GitHub para capturar dados de notificações, releases, etc.

- **src/test**:
  - **mocks**: Contém mocks (simulações) usados nos testes unitários.
  - **src**: Diretório contendo os testes de unidade e integração.

- **src/utils**: Funções utilitárias e auxiliares para facilitar o reuso de código em diferentes partes do projeto.

Essa estrutura foi projetada para ser modular, permitindo fácil manutenção e escalabilidade, com cada funcionalidade devidamente separada em pastas específicas.

### 🧪 Testes Unitários (Na próxima PR)

A estrutura do projeto inclui a pasta **test**, que conterá **testes unitários** e **testes de integração**. Esses testes estão atualmente em desenvolvimento e serão incluídos na próxima PR. Dados simulados já estão preparados, prontos para suportar testes completos. Fique atento para futuras atualizações!

## ⚙️ Como Funciona

### Inicialização

- Carrega as configurações de ambiente do arquivo `.env`.
- Inicializa o bot do Telegram e configura os listeners para monitorar atividades no **GitHub** e **Dev.to**.

### Monitoramento

- As tarefas de monitoramento do **GitHub** e **Dev.to** são agendadas para serem executadas em intervalos específicos usando o **node-cron**.
- As funções de monitoramento buscam dados de suas respectivas APIs e emitem eventos para qualquer nova atividade.

### Manipulação de Eventos

- Listeners capturam os eventos emitidos e enviam mensagens para o **bot do Telegram**.
- O **bot do Telegram** lida com mensagens recebidas e executa comandos, como postar atualizações no **Blue Sky** através do comando `/post`.
- Qualquer erro durante as requisições de API é registrado e pode ser transmitido para o bot do Telegram para acompanhamento em tempo real.

## 🕒 Agendamento com Cron

O projeto usa **cron jobs** para agendar as tarefas de monitoramento. O seguinte job está agendado para ser executado diariamente às **7h da manhã**:

```javascript
cron.schedule('0 7 * * *', async () => {
    console.log('Iniciando o monitoramento diário às 7h...');
    await monitorReleases(); // Ou monitorNotifications
    console.log('Monitoramento concluído.');
});
```

## 🛠 Como Executar

Clone o repositório:

```bash
git clone https://github.com/your-username/bothub-nexus.git
cd bothub-nexus
```

Instale as dependências:

```bash
npm install
```

Crie e configure o arquivo .env: Adicione os tokens e chaves de API no arquivo .env:

```ini
# Token de autenticação do bot do Telegram
TELEGRAM_BOT_TOKEN=SEU_TELEGRAM_BOT_TOKEN

# IDs dos chats que receberão as notificações no Telegram (separados por vírgula se houver mais de um)
TELEGRAM_CHAT_IDS=SEUS_CHAT_IDS_DO_TELEGRAM

# Nome de usuário da conta no Blue Sky
BLUESKY_USERNAME=SEU_NOME_DE_USUARIO_BLUESKY

# Senha da conta no Blue Sky
BLUESKY_PASSWORD=SUA_SENHA_BLUESKY

# Token de autenticação do GitHub para acesso à API
GITHUB_TOKEN=SEU_TOKEN_DO_GITHUB

# Nome de usuário do GitHub
GITHUB_USERNAME=SEU_NOME_DE_USUARIO_GITHUB

# Chave da API do Dev.to
DEV_TO_API_KEY=SUA_CHAVE_API_DEVTO

# Nome de usuário no Dev.to
DEV_TO_USERNAME=SEU_NOME_DE_USUARIO_DEVTO
```

Inicie o projeto:

```bash
npm start
```

Após iniciar, o Bothub Nexus começará a monitorar as atividades nas plataformas configuradas e enviará notificações ao bot do Telegram. Você também pode usar o comando /post (mensagem) para postar atualizações no Blue Sky.

## 📱 Uso

Interaja com o bot do Telegram usando os seguintes comandos:

```bash
/start: Inicializa o bot e começa a receber notificações.
/post (mensagem): Posta a mensagem especificada no Blue Sky e envia uma confirmação de sucesso no Telegram.
```

O bot monitorará automaticamente e notificará sobre:

- Notificações e releases do GitHub.
- Postagens no Dev.to.

## 🤝 Contribuindo

Agradecemos contribuições da comunidade! Fique à vontade para enviar issues, pull requests e sugestões de melhorias. Para mudanças significativas, por favor, abra uma issue primeiro para discutir as alterações propostas.

## 📄 Licença

Bothub Nexus está licenciado sob a Licença MIT. Você é livre para usar, modificar e distribuir este projeto com a devida atribuição.
