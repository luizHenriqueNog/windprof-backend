const { ChatOpenAI } = require("@langchain/openai");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const { createRetrievalChain } = require("langchain/chains/retrieval");
const { prompt } = require("../templates/promptTemplate");
const { loadBaseDocs } = require("../utils/vectorStoreManager"); // Utilize o gerenciador de armazenamento de vetores
const config = require("../config/config");

// Inicialização do modelo do ChatOpenAI com as configurações.
const chatModel = new ChatOpenAI({
  openAIApiKey: config.openaiApiKey,
  temperature: 0.1,
  modelName: config.modelName
});

// Exemplos de saídas esperadas para orientação do modelo
const examples = [
  { input: ".btn {background-color: #f3f4f6; border: 1px; border-radius: 16px; color: #000;}", output: "className='bg-gray-100 border rounded-2xl text-black'" },
  { input: "#container{max-width: 1024px; margin: 0 auxo}", output: "className='max-w-5xl mx-auto'" },
  { input: ".btn { background-color: #fcfcfc; border: 8px; border-radius: 14px; color: #fff; }", output: "className='bg-gray-50 border-8 rounded-lg text-white'" },
];

// Função para formatar os exemplos para o modelo entender
function formatExamples(examples) {
  return examples.map(example => `Exemplo:\nEntrada do usuário (CSS): "${example.input}"\nSaída esperada: ${example.output}\n\n`).join('');
}

// Função para traduzir CSS usando o modelo de linguagem e cadeias de documentos
async function translateCss(inputUser, messageHistory){
    try{
      // Carrega o documento base usando o gerenciador
      const baseDocs = await loadBaseDocs(inputUser);

      const documentChain = await createStuffDocumentsChain({
        llm: chatModel,
        prompt,
      });

      // Usa o retriever do gerenciador
      const retrievalChain = await createRetrievalChain({
          combineDocsChain: documentChain,
          retriever: baseDocs.retriever,
      });

      const examplesText = formatExamples(examples);

      const result = await retrievalChain.invoke({
          input: inputUser,
          examples: examplesText,
          history: messageHistory.messages,
      });

      return result;
    }catch(e){
      console.error(e);
      return "Erro";
    }
}

module.exports = { translateCss };
