import walk from "walkdir"
import path from "path"

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


import { BuildOpenAIEmbeddings } from "./embeddings";
import { BuildSupabaseVectorStore } from "./vectorStores";

const embeddings = BuildOpenAIEmbeddings()
const vectorStore = BuildSupabaseVectorStore(embeddings)

const docs = await walk.async('docs');

//get a single document for faster testing
for (var doc of docs.filter(doc => doc.includes('/525.pdf'))) {
    const id = path.basename(doc, '.pdf')
    console.log(id)

    const loader = new PDFLoader(doc);

    try {
        const data = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100,
        });

        const splitDocs = await textSplitter.splitDocuments(data);

        await vectorStore.addDocuments(splitDocs)

    } catch (e) {
        console.log(e)
    }
}
