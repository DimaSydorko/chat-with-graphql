import { Forum, Message, User } from '../__generated__/resolvers-types';

export type TUser = Omit<User, '__typename'>;
export type TForum = Omit<Forum, '__typename' | 'users'>;
export type TMessage = Omit<Message, '__typename' | 'owner'>;
