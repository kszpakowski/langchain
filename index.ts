import walk from "walkdir"
import path from "path"

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const docs = await walk.async('docs');
const embeddings = new OllamaEmbeddings({
    baseUrl: "http://127.0.0.1:11434",
    model: "llama2:13b"
});

const vectorStore = await MemoryVectorStore.fromExistingIndex(embeddings)


for (var doc of docs.filter(doc => doc.includes('/525.pdf'))) {
    const id = path.basename(doc, '.pdf')
    console.log(id)

    const loader = new PDFLoader(doc);

    try {
        const data = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 0,
        });

        const splitDocs = await textSplitter.splitDocuments(data);

        console.log('split docs length', splitDocs.length)

        vectorStore.addDocuments(splitDocs)



    } catch (e) {
        console.log(e)
    }
}
