const { loadBaseDocs } = require('../loaders/webLoader');
const { initVectorStore } = require('../utils/vectorStore');

class DocumentService {
    constructor() {
        this.baseDocs = [];
        this.vectorStore = null;
        this.retriever = null;
    }

    async loadAndPrepareDocuments() {
        // Carrega documentos da web
        this.baseDocs = await loadBaseDocs();
        
        // Inicializa a vector store e o retriever com os documentos carregados
        const { vectorstore, retriever } = await initVectorStore(this.baseDocs);
        this.vectorStore = vectorstore;
        this.retriever = retriever;
    }

    // Adicione mais métodos conforme a necessidade, por exemplo, para salvar documentos, atualizar, etc.
}

module.exports = DocumentService;
