const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adinakhan:<password>@cluster0.dmjotrk.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useNewUrlParser: true,  useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB'); 
    }
})

client.connect(err => {
    const collection = client.db("test").collection("devices");
    // Insert a document
    collection.insertOne({device: 'mobile', brand: 'Apple'}, (err, result) => {
      if (err) throw err;
      console.log('Document inserted: ', result);
    });
    client.close();
  });
  