const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { User } = require("./models");

require("./config");


const typeDefs = gql`
type User{
    id:ID!
    userName:String
    email:String
}

type Query{
    getUsers:[User]
    getUser(email:String!):User
}

type Mutation{
    addUser(userName:String!, email:String!):User
}
`;

const resolvers = {
    Query: {
        getUsers: async () => await User.find({}).exec(),
        getUser: async (_, args) => {
            try {
                let response = await User.findOne(args);
                return response;
            } catch (e) {
                return e.message;
            }
        }
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await User.create(args);
                return response;
            } catch (e) {
                return e.message;
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();




// Settings
app.set("port",process.env.PORT || 3000);


server.applyMiddleware({ app });


app.listen(app.get("port"), () => {
    console.log("Server on port",app.get("port"));

    
});