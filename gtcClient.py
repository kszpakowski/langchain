import zeep
import os

client = zeep.Client(wsdl='https://gtc.nn.pl/gtc/services/GtcServiceHttpPort?wsdl')

os.makedirs('docs', exist_ok=True)

all_docs = client.service.getAllGtcDocuments().body['return']
print('Docs metadata ready.')

for doc in all_docs:
    try:
        id = str(doc.idHeadDoc)
        print('Saving doc: ' + id)
        doc = client.service.getGtcDocumentBody(id).body['return']

        with open("docs/" + id + ".pdf", "wb") as f :
            f.write(doc['document'])
    except:
        print("An exception occurred for doc id:" + id)