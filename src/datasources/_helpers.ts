import { readFileSync } from 'fs';
import { Forum } from '../__generated__/resolvers-types';
import { TForum, TMessage, TUser } from '../types';
import { DataSourceContext } from '../types/dataSourceContext';

type TFixturesData = {
  users: TUser[];
  forums: TForum[];
  messages: TMessage[];
};

const initFixturesData: TFixturesData = {
  users: [],
  forums: [],
  messages: [],
};

export function _getFixtures(): TFixturesData {
  const dataJSON = readFileSync('./fixtures.json', 'utf-8');
  const data = JSON.parse(dataJSON.toString()) as Partial<TFixturesData> | undefined;
  return { ...initFixturesData, ...data };
}

export function _findUsersInForums(forums: TForum[], { dataSources }: DataSourceContext): Forum[] {
  return forums.map(forum => ({
    ...forum,
    users: forum.usersIds.map(uid => dataSources.usersAPI.findUserById(uid)),
  }));
}
