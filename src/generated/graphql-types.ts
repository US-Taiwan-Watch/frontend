export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type EventPayloadPublish = {
  __typename?: 'EventPayloadPublish';
  data?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<Scalars['Boolean']>;
  emitGlobalEvent: Scalars['Boolean'];
  emitUserEvent: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationEmitGlobalEventArgs = {
  data: Scalars['String'];
};


export type MutationEmitUserEventArgs = {
  data: Scalars['String'];
  userIdx: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  imUser?: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onGlobalEvent: EventPayloadPublish;
  onUserEvent: EventPayloadPublish;
};


export type SubscriptionOnUserEventArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};
