import { createClient } from "@supabase/supabase-js";
import { Embeddings } from "langchain/embeddings/base";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import dotenv from "dotenv"
dotenv.config()


export const BuildSupabaseVectorStore = (embeddings: Embeddings) => {
    const SUPABASE_KEY = process.env['SUPABASE_API_KEY'] || ""
    const client = createClient("http://127.0.0.1:8000", SUPABASE_KEY);

    return new SupabaseVectorStore(embeddings, {
        client: client
    });
}