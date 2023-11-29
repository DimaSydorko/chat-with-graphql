import { DataSource } from 'apollo-datasource';
import { nanoid } from 'nanoid';
import { SendForumMessageInput } from '../__generated__/resolvers-types';
import { TMessage } from '../types';
import { UID_LENGTH } from '../utils/constants';
import { _getFixtures } from './_helpers';

export const MessagesDB: TMessage[] = _getFixtures().messages;

export class MessagesDataSource extends DataSource {
  getMessages(): TMessage[] {
    return MessagesDB;
  }

  getForumMessages(forumId: string): TMessage[] {
    return MessagesDB.filter(message => message.forumId.includes(forumId)).sort(
      (a, b) => new Date(b.sendingTime).getTime() - new Date(a.sendingTime).getTime(),
    );
  }

  sendMessageInForum(newMessage: SendForumMessageInput): TMessage {
    const message: TMessage = { id: nanoid(UID_LENGTH), sendingTime: new Date().toString(), ...newMessage };
    MessagesDB.push(message);
    return message;
  }
}
