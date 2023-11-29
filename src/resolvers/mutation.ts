import { Forum, JoinForumResponse, Message, MutationResolvers, User } from '../__generated__/resolvers-types';
import { _findUsersInForums } from '../datasources/_helpers';
import { DataSourceContext } from '../types/dataSourceContext';

const mutations: MutationResolvers = {
  createUser: async (_, { newUser }, { dataSources }: DataSourceContext): Promise<User> => {
    return dataSources.usersAPI.createUser(newUser);
  },

  createForum: async (_, { newForum }, { dataSources }: DataSourceContext): Promise<Forum> => {
    const forum = await dataSources.forumsAPI.createForum(newForum);
    return _findUsersInForums([forum], { dataSources })[0];
  },

  joinForumById: async (_, { joinForum }, { dataSources }: DataSourceContext): Promise<JoinForumResponse> => {
    const forum = await dataSources.forumsAPI.addUser(joinForum);
    const user = await dataSources.usersAPI.addToForum(joinForum);
    return { user, forum: _findUsersInForums([forum], { dataSources })[0] };
  },

  sendMessageInForum: async (_, { newMessage }, { dataSources }: DataSourceContext): Promise<Message> => {
    const forum = await dataSources.forumsAPI.getForumById(newMessage.forumId);
    if (!forum.usersIds.includes(newMessage.ownerId)) {
      throw new Error(`User with ID:"${newMessage.ownerId}" don't exist in Forum with ID: ${newMessage.forumId}`);
    }
    const message = dataSources.messagesAPI.sendMessageInForum(newMessage);
    return { ...message, owner: dataSources.usersAPI.findUserById(message.ownerId) };
  },
};

export default mutations;
