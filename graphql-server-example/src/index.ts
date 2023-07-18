import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//const mongoose =require('mongoose');
//const MONGODB = "mongodb+srv://furkanaliturk:codes@cluster0.rrysnao.mongodb.net/?retryWrites=true&w=majority";
//trying to add mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://furkanaliturk:codes@cluster0.rrysnao.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
const books = [
    {
        title: 'Cinnet Mustatili',
        author: 'Necip Fazıl Kısakürek',
    },
    {
        title: 'Kızıl Elma',
        author: 'Nihal Atsız',
    },
    {
        title: 'Bilmemek',
        author: 'Milan Kundera',
    },

];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
/*
mongoose.connect(MONGODB, {useNewUrlParser : true})
    .then(() => {
        console.log("MongoDB Connection SuccessFul!");
        //return server.listen({port : 4000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);

 */
