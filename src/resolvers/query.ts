import { Forum, Message, QueryResolvers, User } from '../__generated__/resolvers-types';
import { _findUsersInForums } from '../datasources/_helpers';
import { DataSourceContext } from '../types/dataSourceContext';

const queries: QueryResolvers = {
  getAllUsers: async (_, __, { dataSources }: DataSourceContext): Promise<User[]> => {
    return dataSources.usersAPI.getUsers();
  },

  getAllForums: async (_, __, { dataSources }: DataSourceContext): Promise<Forum[]> => {
    const forums = await dataSources.forumsAPI.getForums();
    return _findUsersInForums(forums, { dataSources });
  },

  getJoinedForums: async (_, { userId }, { dataSources }: DataSourceContext): Promise<Forum[]> => {
    const forums = await dataSources.forumsAPI.getJoinedForums(userId);
    return _findUsersInForums(forums, { dataSources });
  },

  getAvailableForums: async (_, { userId }, { dataSources }: DataSourceContext): Promise<Forum[]> => {
    const forums = await dataSources.forumsAPI.getAvailableForums(userId);
    return _findUsersInForums(forums, { dataSources });
  },

  getAllMessages: async (_, __, { dataSources }: DataSourceContext): Promise<Message[]> => {
    const messages = dataSources.messagesAPI.getMessages();
    return messages.map(mess => ({ ...mess, owner: dataSources.usersAPI.findUserById(mess.ownerId) }));
  },

  getForumMessages: async (_, { forumId }, { dataSources }: DataSourceContext): Promise<Message[]> => {
    const messages = dataSources.messagesAPI.getForumMessages(forumId);
    return messages.map(mess => ({ ...mess, owner: dataSources.usersAPI.findUserById(mess.ownerId) }));
  },
};

export default queries;
