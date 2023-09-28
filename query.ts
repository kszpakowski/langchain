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

const simpleRes = await vectorStore.similaritySearch("kto podpisał dokument?", 1);
console.log(JSON.stringify(simpleRes, null, 2));