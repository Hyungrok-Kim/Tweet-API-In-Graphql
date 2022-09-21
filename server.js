import { ApolloServer, gql } from "apollo-server";

let tweets = [
    {
        id: "1",
        text: "hello",
    },
    {
        id: "2",
        text: "world",
    },
    {
        id: "3",
        text: "Third Unit",
    },
    {
        id: "4",
        text: "4th Unit",
    },
    {
        id: "5",
        text: "5th Unit",
    },
    {
        id: "6",
        text: "6th Unit",
    },
    {
        id: "7",
        text: "7th Unit",
    },
    {
        id: "8",
        text: "8th Unit",
    },
    {
        id: "9",
        text: "9th Unit"
    },
    {
        id: "10",
        text: "10th Unit"
    },
    {
        id: "11",
        text: "11th Unit"
    }
]

let users = [
    {
        id: "1",
        firstName: "Hyungrok",
        lastName: "Kim",
    },
    {
        id: "2",
        firstName: "Gildong",
        lastName: "Hong",
    },
];

/**
 * Alias type Query -> Root
 * type Root 안의 모든 것들은 Rest API에서 URL을 만드는 것과 같다.
 * 
 * REST에서 POST를 담당하는 스페셜 type. -> Mutation
 */
const typeDefs = gql`
    schema {
        query: Root
    }

    type User {
        id: ID!
        fullName: String!
        firstName: String!
        lastName: String!
    }

    type Tweet {
        id: ID!
        text: String!
        Author: User
    }

    type Root {
        allUsers: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`; // SDL(Schema Definition Language)를 미리 정의를 해줘야 ApolloServer Error가 안남.

const resolvers = {
    Root: {
        allTweets() {
            return tweets;
        },
        tweet(_, { id }) {
            console.log(`root : ${JSON.stringify(root)}`);
            console.log(`args : ${id}`);
            return tweets.find((tweet) => tweet.id === id);
        },
        allUsers() {
            return users;
        },
    },
    Mutation: {
        postTweet(_, { text, userId }) {
            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, { id }) {
            const tweet = tweets.find(tweet => tweet.id === id);
            if (!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id)
            return true;
        }
    },
    User: {
        fullName({ firstName, lastName }) {
            return `${firstName} ${lastName}`;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
})