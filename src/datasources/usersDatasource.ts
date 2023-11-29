import { DataSource } from 'apollo-datasource';
import { nanoid } from 'nanoid';
import { CreateUserInput, JoinForumInput, User } from '../__generated__/resolvers-types';
import { TUser } from '../types';
import { UID_LENGTH } from '../utils/constants';
import { _getFixtures } from './_helpers';

export const UsersDB: TUser[] = _getFixtures().users;

export class UsersDataSource extends DataSource {
  getUsers(): User[] {
    return UsersDB;
  }

  findUserById(userId: string): User {
    const user = UsersDB.find(user => user.id === userId);
    if (!user) {
      throw new Error(`User with ID:"${userId}" don't exist`);
    }
    return user;
  }

  addToForum({ userId, forumId }: JoinForumInput): User {
    const userIdx = UsersDB.findIndex(user => user.id === userId);

    if (userIdx === -1) {
      throw new Error(`User with ID:"${userId}" don't exist`);
    }

    const user = UsersDB[userIdx];
    if (user.forumsIds.includes(forumId)) {
      throw new Error(`Forum ID:"${forumId}" already have user with ID: "${userId}"`);
    }

    const updatedUser: TUser = { ...user, forumsIds: [...user.forumsIds, forumId] };
    UsersDB[userIdx] = updatedUser;
    return updatedUser;
  }

  createUser(newUser: CreateUserInput): User {
    const user: TUser = { id: nanoid(UID_LENGTH), forumsIds: [], ...newUser };
    UsersDB.push(user);
    return user;
  }
}
