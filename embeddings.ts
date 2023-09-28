import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import dotenv from "dotenv"
dotenv.config()

export const BuildOpenAIEmbeddings = () => {
    const OPENAPI_KEY = process.env['OPENAPI_KEY'] || "";
    return new OpenAIEmbeddings({
        openAIApiKey: OPENAPI_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
        batchSize: 512, // Default value if omitted is 512. Max is 2048
    });
}

export const BuildOllamaEmbeddings = () => {
    return new OllamaEmbeddings({
        baseUrl: "http://127.0.0.1:11434",
        model: "llama2"
    });
}