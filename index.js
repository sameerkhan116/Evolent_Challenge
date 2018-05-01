import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas';
import path from 'path';
import cors from 'cors';
import 'colors';

import models from './models';

const app = express();
const PORT = 5000;
const endpointURL = '/graphql';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors('*'));
app.use(endpointURL, bodyParser.json(), graphqlExpress({
  schema,
  context: {
    models,
  },
}));
app.use('/graphiql', graphiqlExpress({ endpointURL }));

models.sequelize.sync().then(app.listen(PORT, () => {
  console.log(`Test queries/mutations at http://localhost:${PORT}/graphiql`.yellow.underline);
}));
