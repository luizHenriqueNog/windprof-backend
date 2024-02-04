const { OpenAIEmbeddings } = require("@langchain/openai");
const { DocxLoader } = require("langchain/document_loaders/fs/docx");
const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const config = require("../config/config");
const { splitDocuments } = require("./textSplitter");

let vectorStoreInstance = null;

// Função para inicializar o armazenamento de vetores
async function initVectorStore() {
  if (!vectorStoreInstance) {
    const loader = new DocxLoader("./src/document_loaders/tailwind_docs_windprof.docx");
    let docs = await loader.load();
    docs = await splitDocuments(docs); 

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: config.openaiApiKey,
      modelName: config.modelEmbedding
    });

    vectorStoreInstance = new FaissStore(embeddings, {});
    await vectorStoreInstance.addDocuments(docs);
  }

  const retriever = vectorStoreInstance.asRetriever();

  return { vectorStoreInstance, retriever };
}

// Função para carregar os documentos base e realizar a busca por similaridade
async function loadBaseDocs(query) {
  const { vectorStoreInstance, retriever } = await initVectorStore();
  const result = await vectorStoreInstance.similaritySearch(query);
  return { result, retriever };
}

module.exports = { initVectorStore, loadBaseDocs };