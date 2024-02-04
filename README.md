# Projeto WindProf Backend

## Descrição
Este projeto é um servidor API construído com Node.js e Express, que utiliza modelos de linguagem OpenAI para traduzir CSS padrão para classes do framework Tailwind CSS. A API recebe CSS como entrada e retorna uma versão traduzida em classes Tailwind.

## Pré-requisitos
Antes de iniciar, verifique se você possui o seguinte instalado:
- Node.js (v12 ou superior)
- npm (v6 ou superior)
- Um `.env` arquivo na raiz do projeto com as chaves de configuração necessárias.

## Configuração

### 1. Clone o Repositório
\```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_REPOSITÓRIO]
\```

### 2. Instale as Dependências
\```bash
npm install
\```

### 3. Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto e preencha-o conforme o exemplo abaixo:
\```
OPENAI_API_KEY='sua_chave_de_api_aqui'
MODEL_NAME=gpt-3.5-turbo
MODEL_EMBEDDING=text-embedding-3-large
\```

## Uso

### Iniciando o Servidor
Para iniciar o servidor, execute:
\```bash
npm run dev
\```

O servidor estará rodando na porta especificada no arquivo `.env`, ou na porta padrão 5051.

### Endpoint da API

#### Traduzir CSS para Tailwind
- **URL:** `/translate`
- **Método:** `POST`
- **Corpo da Requisição:** JSON com a estrutura `{ messages: [{ content: "Seu CSS aqui" }] }`
- **Resposta:** Tradução do CSS em classes Tailwind.

## Suporte
Para dúvidas ou suporte, crie uma issue no repositório ou entre em contato com o mantenedor.
