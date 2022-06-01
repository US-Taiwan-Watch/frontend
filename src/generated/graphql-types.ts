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

export type Bill = {
  __typename?: 'Bill';
  billNumber: Scalars['Float'];
  billType: Scalars['String'];
  congress: Scalars['Float'];
  introducedDate?: Maybe<Scalars['String']>;
};

export type EventPayloadPublish = {
  __typename?: 'EventPayloadPublish';
  data?: Maybe<Scalars['String']>;
};

export type Member = {
  __typename?: 'Member';
  birthday?: Maybe<Scalars['String']>;
  congressRoles: Array<MemberRole>;
  cspanId?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  office?: Maybe<Scalars['String']>;
  osId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profilePictureUri?: Maybe<Scalars['String']>;
  pvsId?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  youtubeId?: Maybe<Scalars['String']>;
};

export type MemberRole = {
  __typename?: 'MemberRole';
  chamber: Scalars['String'];
  congressNumbers: Array<Scalars['Int']>;
  district?: Maybe<Scalars['Int']>;
  endDate: Scalars['Float'];
  party: Scalars['String'];
  senatorClass?: Maybe<Scalars['Int']>;
  startDate: Scalars['Float'];
  state: Scalars['String'];
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
  bill?: Maybe<Bill>;
  bills: Array<Bill>;
  imUser?: Maybe<User>;
  member?: Maybe<Member>;
  members: Array<Member>;
};


export type QueryBillArgs = {
  id: Scalars['String'];
};


export type QueryMemberArgs = {
  bioGuideId: Scalars['String'];
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
