const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://EK:engina@customerapi.fmja6.mongodb.net/CustomerAPI?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);

        console.log(movie);
  } finally {
    await client.close();
}
}
run().catch(console.dir);
    