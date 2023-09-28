import { BuildOpenAIEmbeddings } from "./embeddings";
import { BuildSupabaseVectorStore } from "./vectorStores";

const embeddings = BuildOpenAIEmbeddings()
const vectorStore = BuildSupabaseVectorStore(embeddings)

const simpleRes = await vectorStore.similaritySearch("kto podpisał dokument?", 5);
console.log(JSON.stringify(simpleRes.map(x => x.pageContent), null, 2));