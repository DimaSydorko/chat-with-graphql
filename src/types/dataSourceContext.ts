import { ForumsDataSource } from '../datasources/forumsDatasource';
import { MessagesDataSource } from '../datasources/messagesDatasource';
import { UsersDataSource } from '../datasources/usersDatasource';

export interface DataSourceContext {
  dataSources: {
    usersAPI: UsersDataSource;
    forumsAPI: ForumsDataSource;
    messagesAPI: MessagesDataSource;
  };
}
