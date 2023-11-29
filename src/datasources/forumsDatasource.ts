import { DataSource } from 'apollo-datasource';
import { nanoid } from 'nanoid';
import { CreateForumInput, JoinForumInput } from '../__generated__/resolvers-types';
import { TForum } from '../types';
import { UID_LENGTH } from '../utils/constants';
import { _getFixtures } from './_helpers';

export const ForumsDB: TForum[] = _getFixtures().forums;

export class ForumsDataSource extends DataSource {
  async getForums(): Promise<TForum[]> {
    return ForumsDB;
  }

  async getForumById(forumId: string): Promise<TForum> {
    const forum = ForumsDB.find(forum => forum.id === forumId);
    if (!forum) {
      throw new Error(`Forum with ID:"${forumId}" don't exist`);
    }
    return forum;
  }

  async getJoinedForums(userId: string): Promise<TForum[]> {
    return ForumsDB.filter(forum => forum.usersIds?.includes(userId));
  }

  async getAvailableForums(userId: string): Promise<TForum[]> {
    return ForumsDB.filter(forum => !forum.usersIds?.includes(userId));
  }

  async createForum(newForum: CreateForumInput): Promise<TForum> {
    const forum: TForum = {
      id: nanoid(UID_LENGTH),
      messagesIds: [],
      usersIds: [newForum.ownerId],
      ...newForum,
    };
    ForumsDB.push(forum);
    return forum;
  }

  async addUser({ userId, forumId }: JoinForumInput): Promise<TForum> {
    const forumIdx = ForumsDB.findIndex(forum => forum.id === forumId);

    if (forumIdx === -1) {
      throw new Error(`Forum with ID:"${forumId}" don't exist`);
    }

    const forum = ForumsDB[forumIdx];

    if (forum.usersIds.includes(userId)) {
      throw new Error(`User with ID: "${userId}" already exist in forum ID:"${forumId}"`);
    }

    const updatedForum: TForum = { ...forum, usersIds: [...forum.usersIds, userId] };
    ForumsDB[forumIdx] = updatedForum;
    return updatedForum;
  }
}
