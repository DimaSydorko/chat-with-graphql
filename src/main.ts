import { ApolloServer } from 'apollo-server';
import { DataSources } from 'apollo-server-core/src/graphqlOptions';
import { readFileSync } from 'fs';
import { ForumsDataSource } from './datasources/forumsDatasource';
import { MessagesDataSource } from './datasources/messagesDatasource';
import { UsersDataSource } from './datasources/usersDatasource';
import resolvers from './resolvers';
import { DataSourceContext } from './types/DataSourceContext';

const port = 5000;

async function bootstrap() {
  const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: (): DataSources<DataSourceContext> => ({
      usersAPI: new UsersDataSource(),
      forumsAPI: new ForumsDataSource(),
      messagesAPI: new MessagesDataSource(),
    }),
  });

  const { url } = await server.listen(port);
  console.log(`Server started running at:${url}`, 'Bootstrap');
}

bootstrap();
