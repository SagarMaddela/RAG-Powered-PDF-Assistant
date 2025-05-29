from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.llms import Ollama
from langchain import PromptTemplate

# Globals
VECTOR_DIR = "vectorstore"
MODEL_NAME = "all-MiniLM-L6-v2"
LLM = Ollama(model="mistral", temperature=0)

template = """
### System:
You are a helpful assistant that answers questions based on the provided context from a PDF document. Use the information in the context to provide accurate and concise answers. Keep your responses in 100 words.
If the answer is not found in the context, respond with "I don't know" or "The answer is not in the document." Do not make up answers.
Always cite the source document in your response.

### Context:
{context}

### User:
{question}

### Response:
"""
PROMPT = PromptTemplate.from_template(template)
CHAIN = None

# This will load the PDF file
def process_pdf(file_path):

    # Creating a PyMuPDFLoader object with file_path
    loader = PyMuPDFLoader(file_path)

    # loading the PDF file
    docs = loader.load()

    # Responsible for splitting the documents into several chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=20)

    # Splitting the documents into chunks
    chunks = splitter.split_documents(docs)

    #loading the embedding model
    embed = HuggingFaceEmbeddings(
        model_name=MODEL_NAME,
        model_kwargs={'device': 'cpu'},
        encode_kwargs={'normalize_embeddings': True}
    )

    # Creating the embeddings using FAISS
    vectorstore = FAISS.from_documents(chunks, embed)

    # Saving the model in current directory
    vectorstore.save_local(VECTOR_DIR)

    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 5})


    # Creating the chain for Question Answering
    global CHAIN
    CHAIN = RetrievalQA.from_chain_type(
        llm=LLM,
        retriever=retriever,
        chain_type="stuff",
        return_source_documents=True,
        chain_type_kwargs={'prompt': PROMPT}
    )

def get_answer(query):
    if CHAIN is None:
        raise ValueError("PDF not processed yet.")
    response = CHAIN.invoke({'query': query})
    return response['result']
