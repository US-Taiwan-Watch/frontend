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
  authorInfos?: Maybe<Array<User>>;
  content?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  imageSource?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  lastModifiedTime?: Maybe<Scalars['Float']>;
  preview?: Maybe<I18NText>;
  publishedTime?: Maybe<Scalars['Float']>;
  slug?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<I18NText>;
  type?: Maybe<ArticleType>;
};

export enum ArticleType {
  Article = 'ARTICLE',
  Poster = 'POSTER'
}

export enum Auth0RoleName {
  Admin = 'Admin',
  Editor = 'Editor',
  S2S = 'S2S'
}

export type Banner = {
  __typename?: 'Banner';
  cta?: Maybe<Scalars['String']>;
  imageSource: Scalars['String'];
};

export type Bill = {
  __typename?: 'Bill';
  billNumber: Scalars['Float'];
  billType: Scalars['String'];
  congress: Scalars['Float'];
  cosponsors: Array<Member>;
  cosponsorsCount?: Maybe<Scalars['Int']>;
  createdTime?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  introducedDate?: Maybe<Scalars['String']>;
  isSyncing: Scalars['Boolean'];
  sponsor?: Maybe<Member>;
  summary?: Maybe<I18NText>;
  title?: Maybe<I18NText>;
  trackers?: Maybe<Array<BillTracker>>;
  versions: Array<TextVersionWithFiles>;
};

export type BillInput = {
  billNumber: Scalars['Float'];
  billType: Scalars['String'];
  congress: Scalars['Float'];
  introducedDate?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<I18NTextInput>;
  title?: InputMaybe<I18NTextInput>;
};

export type BillQueryInput = {
  keywords: Array<Scalars['String']>;
};

export type BillTracker = {
  __typename?: 'BillTracker';
  selected: Scalars['Boolean'];
  stepName: Scalars['String'];
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

export type I18NTextInput = {
  en?: InputMaybe<Scalars['String']>;
  zh?: InputMaybe<Scalars['String']>;
};

export type Member = {
  __typename?: 'Member';
  birthday?: Maybe<Scalars['String']>;
  congressRoleSnapshot?: Maybe<MemberRoleSnapshot>;
  congressRoles: Array<MemberRole>;
  cspanId?: Maybe<Scalars['String']>;
  displayName?: Maybe<I18NText>;
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

export type MemberFiltersInput = {
  bioGuideIds?: InputMaybe<Array<Scalars['String']>>;
  congress?: InputMaybe<Scalars['Float']>;
  state?: InputMaybe<Scalars['String']>;
};

export type MemberRole = {
  __typename?: 'MemberRole';
  chamber: Scalars['String'];
  congressNumbers: Array<Scalars['Int']>;
  district?: Maybe<Scalars['Int']>;
  endDate: Scalars['String'];
  parties: Array<PartyRecord>;
  senatorClass?: Maybe<Scalars['Int']>;
  startDate: Scalars['String'];
  state: Scalars['String'];
};

export type MemberRoleSnapshot = {
  __typename?: 'MemberRoleSnapshot';
  chamber: Scalars['String'];
  congressNumber: Scalars['Int'];
  district?: Maybe<Scalars['Int']>;
  party?: Maybe<Scalars['String']>;
  senatorClass?: Maybe<Scalars['Int']>;
  state: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addArticle?: Maybe<Article>;
  addBill?: Maybe<Bill>;
  createOrUpdateUser?: Maybe<Scalars['Boolean']>;
  deleteArticle: Scalars['Boolean'];
  deleteBill: Scalars['Boolean'];
  emitGlobalEvent: Scalars['Boolean'];
  emitUserEvent: Scalars['Boolean'];
  syncBill?: Maybe<Bill>;
  syncFromNotion: Scalars['Boolean'];
  updateArticleWithId?: Maybe<Article>;
  updateBill?: Maybe<Bill>;
  updateUser: User;
};


export type MutationAddArticleArgs = {
  authors?: InputMaybe<Array<Scalars['String']>>;
  content?: InputMaybe<Scalars['String']>;
  imageSource?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  preview?: InputMaybe<I18NTextInput>;
  slug?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<I18NTextInput>;
  type?: InputMaybe<ArticleType>;
};


export type MutationAddBillArgs = {
  bill: BillInput;
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


export type MutationDeleteBillArgs = {
  id: Scalars['String'];
};


export type MutationEmitGlobalEventArgs = {
  data: Scalars['String'];
};


export type MutationEmitUserEventArgs = {
  data: Scalars['String'];
  userIdx: Array<Scalars['String']>;
};


export type MutationSyncBillArgs = {
  billId: Scalars['String'];
};


export type MutationSyncFromNotionArgs = {
  type: NotionSyncType;
};


export type MutationUpdateArticleWithIdArgs = {
  authors?: InputMaybe<Array<Scalars['String']>>;
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  imageSource?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  preview?: InputMaybe<I18NTextInput>;
  publishedTime?: InputMaybe<Scalars['Float']>;
  slug?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<I18NTextInput>;
  type?: InputMaybe<ArticleType>;
};


export type MutationUpdateBillArgs = {
  bill: BillInput;
};


export type MutationUpdateUserArgs = {
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
};

export enum NotionSyncType {
  Article = 'ARTICLE'
}

export type PaginatedArticles = {
  __typename?: 'PaginatedArticles';
  hasMore: Scalars['Boolean'];
  items: Array<Article>;
  total: Scalars['Int'];
};

export type PaginatedBills = {
  __typename?: 'PaginatedBills';
  hasMore: Scalars['Boolean'];
  items: Array<Bill>;
  total: Scalars['Int'];
};

export type PaginatedMembers = {
  __typename?: 'PaginatedMembers';
  hasMore: Scalars['Boolean'];
  items: Array<Member>;
  total: Scalars['Int'];
};

export type PartyRecord = {
  __typename?: 'PartyRecord';
  endDate: Scalars['String'];
  party: Scalars['String'];
  startDate: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  banners: Array<Banner>;
  bill?: Maybe<Bill>;
  bills: PaginatedBills;
  editors: Array<User>;
  getAllArticles: Array<Article>;
  getArticle?: Maybe<Article>;
  getPostsWithType: PaginatedArticles;
  getPublicArticle?: Maybe<Article>;
  getPublicArticlesAfter: PaginatedArticles;
  getUser: User;
  getUsers: Array<User>;
  imUser?: Maybe<User>;
  isAdmin: Scalars['Boolean'];
  member?: Maybe<Member>;
  members: PaginatedMembers;
  myRoles?: Maybe<Array<Auth0RoleName>>;
};


export type QueryBillArgs = {
  id: Scalars['String'];
};


export type QueryBillsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  query?: InputMaybe<BillQueryInput>;
  sortDirections?: InputMaybe<Array<Scalars['Float']>>;
  sortFields?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryGetArticleArgs = {
  id: Scalars['String'];
};


export type QueryGetPostsWithTypeArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  sortDirections?: InputMaybe<Array<Scalars['Float']>>;
  sortFields?: InputMaybe<Array<Scalars['String']>>;
  type: ArticleType;
};


export type QueryGetPublicArticleArgs = {
  slug: Scalars['String'];
};


export type QueryGetPublicArticlesAfterArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  slug: Scalars['String'];
  sortDirections?: InputMaybe<Array<Scalars['Float']>>;
  sortFields?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryGetUserArgs = {
  user_id: Scalars['String'];
};


export type QueryGetUsersArgs = {
  user_id: Array<Scalars['String']>;
};


export type QueryMemberArgs = {
  bioGuideId: Scalars['String'];
  snapshotDate?: InputMaybe<Scalars['String']>;
};


export type QueryMembersArgs = {
  filters?: InputMaybe<MemberFiltersInput>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  snapshotDate?: InputMaybe<Scalars['String']>;
  sortDirections?: InputMaybe<Array<Scalars['Float']>>;
  sortFields?: InputMaybe<Array<Scalars['String']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onGlobalEvent: EventPayloadPublish;
  onUserEvent: EventPayloadPublish;
};


export type SubscriptionOnUserEventArgs = {
  userId: Scalars['String'];
};

export type TextVersionFiles = {
  __typename?: 'TextVersionFiles';
  pdf?: Maybe<Scalars['String']>;
  txt?: Maybe<Scalars['String']>;
  xml?: Maybe<Scalars['String']>;
};

export type TextVersionWithFiles = {
  __typename?: 'TextVersionWithFiles';
  code: Scalars['String'];
  date: Scalars['String'];
  files?: Maybe<TextVersionFiles>;
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};
