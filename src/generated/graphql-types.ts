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

export type Article = {
  __typename?: 'Article';
  authors?: Maybe<Array<Scalars['String']>>;
  content?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  imageSource?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  lastModifiedTime?: Maybe<Scalars['Float']>;
  preview?: Maybe<Scalars['String']>;
  pusblishTime?: Maybe<Scalars['Float']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export enum Auth0RoleName {
  Admin = 'Admin',
  Editor = 'Editor',
  S2S = 'S2S'
}

export type DenormalizedBill = {
  __typename?: 'DenormalizedBill';
  billNumber: Scalars['Float'];
  billType: Scalars['String'];
  congress: Scalars['Float'];
  cosponsors?: Maybe<Array<Member>>;
  cosponsorsCount?: Maybe<Scalars['Int']>;
  introducedDate?: Maybe<Scalars['String']>;
  sponsor?: Maybe<Member>;
  title: I18NText;
};

export type EventPayloadPublish = {
  __typename?: 'EventPayloadPublish';
  data?: Maybe<Scalars['String']>;
};

export type I18NText = {
  __typename?: 'I18NText';
  en?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  zh?: Maybe<Scalars['String']>;
};

export type Member = {
  __typename?: 'Member';
  birthday?: Maybe<Scalars['String']>;
  congressRoles: Array<MemberRole>;
  cspanId?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  firstName_zh?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  lastName_zh?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  office?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profilePictureUri?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  youtubeId?: Maybe<Scalars['String']>;
};

export type MemberRole = {
  __typename?: 'MemberRole';
  chamber: Scalars['String'];
  congressNumbers: Array<Scalars['Int']>;
  district?: Maybe<Scalars['Int']>;
  endDate: Scalars['String'];
  party: Scalars['String'];
  senatorClass?: Maybe<Scalars['Int']>;
  startDate: Scalars['String'];
  state: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addArticle?: Maybe<Article>;
  createEmptyArticle?: Maybe<Article>;
  createOrUpdateUser?: Maybe<Scalars['Boolean']>;
  deleteArticle?: Maybe<Scalars['Boolean']>;
  emitGlobalEvent: Scalars['Boolean'];
  emitUserEvent: Scalars['Boolean'];
  updateArticleWithId?: Maybe<Article>;
};


export type MutationAddArticleArgs = {
  authors?: InputMaybe<Array<Scalars['String']>>;
  content?: InputMaybe<Scalars['String']>;
  imageSource?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  preview?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationCreateOrUpdateUserArgs = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  user_id: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationEmitGlobalEventArgs = {
  data: Scalars['String'];
};


export type MutationEmitUserEventArgs = {
  data: Scalars['String'];
  userIdx: Array<Scalars['String']>;
};


export type MutationUpdateArticleWithIdArgs = {
  authors?: InputMaybe<Array<Scalars['String']>>;
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  imageSource?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  preview?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type PaginatedBills = {
  __typename?: 'PaginatedBills';
  hasMore: Scalars['Boolean'];
  items: Array<DenormalizedBill>;
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allArticles: Array<Article>;
  article?: Maybe<Article>;
  articles?: Maybe<Array<Article>>;
  bill?: Maybe<DenormalizedBill>;
  bills: PaginatedBills;
  imUser?: Maybe<User>;
  isAdmin: Scalars['Boolean'];
  member?: Maybe<Member>;
  members: Array<Member>;
  myRoles?: Maybe<Array<Auth0RoleName>>;
  publicArticle?: Maybe<Article>;
};


export type QueryArticleArgs = {
  id: Scalars['String'];
};


export type QueryArticlesArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryBillArgs = {
  id: Scalars['String'];
};


export type QueryBillsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryMemberArgs = {
  bioGuideId: Scalars['String'];
};


export type QueryMembersArgs = {
  bioGuideIds?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryPublicArticleArgs = {
  slug: Scalars['String'];
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
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};
