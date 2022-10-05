const {ApolloServer}=require('apollo-server');
const {typeDefs}= require('./schema.js')
const {Query} =require('./resolvers/Query')
const {Category}=require('./resolvers/Category')
const {Mutation}=require('./resolvers/Mutation')
const {Product}=require('./resolvers/Product')
const {db}=require('./db.js')
const app=new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation,
        Category,
        Product
    },
    context:{
        db
    }
});

app.listen().then(({url})=>{
    console.log("Server is ready at ",url);
})