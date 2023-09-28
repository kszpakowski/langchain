import walk from "walkdir"
import path from "path"

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv"

dotenv.config()

const SUPABASE_KEY = process.env['SUPABASE_API_KEY'] || ""
const client = createClient("http://127.0.0.1:8000", SUPABASE_KEY);

const embeddings = new OllamaEmbeddings({
    baseUrl: "http://127.0.0.1:11434",
    model: "llama2"
});

const vectorStore = new SupabaseVectorStore(embeddings, {
    client: client
});


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
