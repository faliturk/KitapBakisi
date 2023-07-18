import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//const mongoose =require('mongoose');
//const MONGODB = "mongodb+srv://furkanaliturk:codes@cluster0.rrysnao.mongodb.net/?retryWrites=true&w=majority";
//trying to add mongodb
import mongoose from 'mongoose';
import express from 'express';
const app = express();
const uri = 'mongodb+srv://furkanaliturk0:codes@cluster0.rrysnao.mongodb.net/?retryWrites=true&w=majority';
app.listen(8000, () => {
    console.log("MongoDB Connection is Successful");
});
async function connect() {
    try {
        mongoose.connect(uri);
        console.log("Connected to MONGODB");
    }
    catch (error) {
        console.log(error);
    }
}
connect();
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
