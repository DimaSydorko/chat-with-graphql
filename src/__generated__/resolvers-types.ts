import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from '../types/DataSourceContext';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _FieldSet: { input: any; output: any; }
};

export type CreateForumInput = {
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
};

export type CreateUserInput = {
  name: Scalars['String']['input'];
  photoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Forum = {
  __typename?: 'Forum';
  id: Scalars['String']['output'];
  messagesIds: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  users: Array<User>;
  usersIds: Array<Scalars['String']['output']>;
};

export type JoinForumInput = {
  forumId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type JoinForumResponse = {
  __typename?: 'JoinForumResponse';
  forum: Forum;
  user: User;
};

export type Message = {
  __typename?: 'Message';
  forumId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  owner: User;
  ownerId: Scalars['String']['output'];
  sendingTime: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForum: Forum;
  createUser: User;
  joinForumById: JoinForumResponse;
  sendMessageInForum: Message;
};


export type MutationCreateForumArgs = {
  newForum: CreateForumInput;
};


export type MutationCreateUserArgs = {
  newUser: CreateUserInput;
};


export type MutationJoinForumByIdArgs = {
  joinForum: JoinForumInput;
};


export type MutationSendMessageInForumArgs = {
  newMessage: SendForumMessageInput;
};

export type Query = {
  __typename?: 'Query';
  getAllForums: Array<Forum>;
  getAllMessages: Array<Message>;
  getAllUsers: Array<User>;
  getAvailableForums: Array<Forum>;
  getForumMessages: Array<Message>;
  getJoinedForums: Array<Forum>;
};


export type QueryGetAvailableForumsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetForumMessagesArgs = {
  forumId: Scalars['String']['input'];
};


export type QueryGetJoinedForumsArgs = {
  userId: Scalars['String']['input'];
};

export type SendForumMessageInput = {
  forumId: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  forumsIds: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  CreateForumInput: CreateForumInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  CreateUserInput: CreateUserInput;
  Forum: ResolverTypeWrapper<Forum>;
  JoinForumInput: JoinForumInput;
  JoinForumResponse: ResolverTypeWrapper<JoinForumResponse>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SendForumMessageInput: SendForumMessageInput;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  CreateForumInput: CreateForumInput;
  String: Scalars['String']['output'];
  CreateUserInput: CreateUserInput;
  Forum: Forum;
  JoinForumInput: JoinForumInput;
  JoinForumResponse: JoinForumResponse;
  Message: Message;
  Mutation: {};
  Query: {};
  SendForumMessageInput: SendForumMessageInput;
  User: User;
  Boolean: Scalars['Boolean']['output'];
}>;

export type ForumResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Forum'] = ResolversParentTypes['Forum']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messagesIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  usersIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JoinForumResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['JoinForumResponse'] = ResolversParentTypes['JoinForumResponse']> = ResolversObject<{
  forum?: Resolver<ResolversTypes['Forum'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  forumId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sendingTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createForum?: Resolver<ResolversTypes['Forum'], ParentType, ContextType, RequireFields<MutationCreateForumArgs, 'newForum'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'newUser'>>;
  joinForumById?: Resolver<ResolversTypes['JoinForumResponse'], ParentType, ContextType, RequireFields<MutationJoinForumByIdArgs, 'joinForum'>>;
  sendMessageInForum?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendMessageInForumArgs, 'newMessage'>>;
}>;

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllForums?: Resolver<Array<ResolversTypes['Forum']>, ParentType, ContextType>;
  getAllMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getAvailableForums?: Resolver<Array<ResolversTypes['Forum']>, ParentType, ContextType, RequireFields<QueryGetAvailableForumsArgs, 'userId'>>;
  getForumMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryGetForumMessagesArgs, 'forumId'>>;
  getJoinedForums?: Resolver<Array<ResolversTypes['Forum']>, ParentType, ContextType, RequireFields<QueryGetJoinedForumsArgs, 'userId'>>;
}>;

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  forumsIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = DataSourceContext> = ResolversObject<{
  Forum?: ForumResolvers<ContextType>;
  JoinForumResponse?: JoinForumResponseResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

