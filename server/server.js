const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  const app = express();
  // const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  
  app.use(routes);
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}`);
      console.log(`GraphQl Path is http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}
startApolloServer();