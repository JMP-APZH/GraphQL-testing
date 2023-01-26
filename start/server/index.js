import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// import { mainCards } from './db';
// import { animals } from './db';

// const { mainCards, animals } = require('./db.js');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type MainCard {
    title: String
    image: String
  }

  type Animal {
    image: String!
    title: String!
    rating: Float
    price: String!
    description: [String!]!
    stock: Int!
    onSale: Boolean
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal]
  }
`;

const mainCards = [
  {
    title: 'Recently reviewed',
    image: 'Lion',
  },
  {
    title: 'Looking for a gift?',
    image: 'Penguin',
  },
  {
    title: 'Best Behaved',
    image: 'Cat',
  },
];

const animals = [
  {
      image: 'lion',
      title: 'dummy1',
      rating: 3.4,
      price: '4',
      description: ['string 1', 'string 2', 'string 3'],
      stock: 4,
      onSale: true
  }
];


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      mainCards: () => mainCards,
      animals: () => animals,
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