const express = require('express');
const cors = require('cors');
const { translateCss } = require('./services/openaiService');
const { loadBaseDocs } = require('./utils/vectorStoreManager');

// Configuração da porta a partir das variáveis de ambiente ou default 5051
const port = process.env.PORT || 5051;
const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Habilita o CORS para todas as origens
app.use(cors({
    origin: '*'
}));

// Função para inicializar os documentos base (Carregamento inicial)
async function initBaseDocs() {
  await loadBaseDocs("");
}

// Rota raiz que retorna uma mensagem de boas-vindas
app.get('/', function (req, res) {
  res.status(200).send({ message: "Bem vindo(a) à API do TransformAI." });
});

// Rota para tradução de CSS
app.post('/translate', async function (req, res) {
    try {
        // Pega a última mensagem e traduz o CSS
        const lastMessage = req.body.messages[req.body.messages.length - 1].content;
        const result = await translateCss(lastMessage, req.body); 
        res.status(200).send(result);
    } catch (error) {
        // Captura erros e retorna um erro 500 com a mensagem
        res.status(500).send({ error: error.message });
    }
});

// Inicializa os documentos base e inicia o servidor
initBaseDocs().then(() => {
    app.listen(port, () => {
        console.log(`Rodando na porta ${port}`);
    });
});
