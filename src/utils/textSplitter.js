const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

// Função para dividir documentos grandes em partes menores
async function splitDocuments(docs) {
  // Instancia o divisor de texto
  const splitter = new RecursiveCharacterTextSplitter();
  // Divide os documentos usando o divisor
  const splitDocs = await splitter.splitDocuments(docs);
  // Retorna os documentos divididos
  return splitDocs;
}

module.exports = { splitDocuments };
