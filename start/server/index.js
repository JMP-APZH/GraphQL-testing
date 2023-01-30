import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// import { mainCards } from './db';
// import { animals } from './db';

// const { mainCards, animals } = require('./db.js');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

import { v4 } from 'uuid';

const typeDefs = `#graphql
  type MainCard {
    title: String
    image: String
  }

  type Animal {
    id: ID!
    image: String!
    title: String!
    rating: Float
    price: String!
    description: [String!]!
    slug: String!
    stock: Int!
    onSale: Boolean
    category: Category
  }

  type Category {
    id: ID!
    image: String!
    category: String!
    slug: String!
    animals: [Animal!]!
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal]
    animal(slug: String!): Animal
    categories: [Category!]!
    category(slug: String!): Category
  }

  type Mutation {
    addAnimal(
        image: String!
        title: String!
        rating: Float
        price: String!
        description: [String!]!
        slug: String!
        stock: Int!
        onSale: Boolean
        category: String!
    ): Animal
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
      id: "1",
      image: "lion",
      title: "7-year Male Lion with Large Well Kept Main with a Beautiful Yellow/Brownish Color",
      rating: 5.0,
      price: "23,322",
      description: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ],
      stock: 14,
      onSale: false,
      slug: "lion",
      category: "1"
  },
  {
      id: "2",
      image: "cham",
      title: "Beautiful Highly Specialized Clade Lizard with 202 Different Color Combinations",
      price: "1,522",
      description: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ],
      stock: 14,
      onSale: false,
      slug: "chameleons",
      category: "2"
  },
  {
      id: "3",
      image: "dolphin",
      title: "Fast and Swift Aquatic Dolphin with Great Accordatic Skills in the Air",
      price: "101,432",
      description: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ],
      stock: 14,
      onSale: false,
      slug: "dolphin",
      category: "3"
  },
  {
      id: "4",
      image: "gorilla",
      title: "Black Haired Gorilla with Broad Chest and Shoulder. Would be an Excellent Spot at the Gym",
      price: "47,775",
      description: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ],
      stock: 14,
      onSale: false,
      slug: "gorilla",
      category: "4"
  },
  {
      id: "5",
      image: "horse",
      title: "17-year Female Horse with a Luxury Brown Exterior and a Beautiful Red Interior",
      price: "13,432",
      description: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ],
      stock: 14,
      onSale: false,
      slug: "horse",
      category: "4"
  },
  {
      id: "6",
      image: "kang",
      title: "Large Kangaroo with Muscular Leg and Tail and Pointly Teeth and Ears",
      price: "42,453",
      description: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ],
      stock: 14,
      onSale: false,
      slug: "kangaroo",
      category: "4"
  },
  {
      id: "7",
      image: "ele",
      title: "Grey Male 17 year Elephant with 12 Meter Truck and 5 Meter Tusk",
      price: "101,432",
      description: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ],
      stock: 14,
      onSale: false,
      slug: "elephant",
      category: "4"
  },
  {
      id: "8",
      image: "donkey",
      title: "This is the Voice Actor from the Dockey for Shrek.",
      price: "179,731",
      description: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ],
      stock: 14,
      onSale: false,
      slug: "donkey",
      category: "4"
  }
];

const categories = [
  {
    id: '1',
    image: 'tiger',
    category: 'cats',
    slug: 'cats',
  },
  {
    id: '2',
    image: 'snake',
    category: 'reptiles',
    slug: 'reptiles'
  },
  {
    id: '3',
    image: 'stingray',
    category: 'ocean creatures',
    slug: 'ocean-creatures'
  },
  {
    id: '4',
    image: 'donkey',
    category: 'mammals',
    slug: 'mammals'
  },
];


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      mainCards: () => mainCards,
      animals: (parents, args, ctx) => animals,
      animal: (parent, args, ctx) => {
        let animal = animals.find((animal) => {
          return animal.slug === args.slug
        })
        return animal
      },
      categories: (parents, args, ctx) => categories,
      category: (parent, args, ctx) => {
        let category = categories.find((category) => {
          console.log(category.slug, args.slug)
          return category.slug === args.slug
        });
        return category
      },
    },
    Category: {
      animals: (parent, args, ctx) => {
        return animals.filter(animal => {
          return animal.category === parent.id
        })
      }
    },
    Animal: {
      category: (parent, args, ctx) => {
        return categories.find((category) => {
          return category.id === parent.category
        })
      }
    },
    Mutation: {
      addAnimal: (parent, {
        image,
        title,
        rating,
        price,
        description,
        slug,
        stock,
        onSale,
        category,
      }, ctx) => {
        // const animals2 = animals
        let newAnimal = {
          id: v4(),
          image,
          title,
          rating,
          price,
          description,
          slug,
          stock,
          onSale,
          category,
        }

        // animals.push(newAnimal)
        // console.log(newAnimal)
        // let animals = animals
        // animals = [...animals2, newAnimal]
        let animals2 = animals.push(newAnimal)
        console.log(animals)
        return newAnimal
      }
    }

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