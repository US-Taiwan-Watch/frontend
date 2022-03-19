/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
module.exports = {
  ObjectType: () => () => { },
  Field: () => () => { },
  ArgsType: () => () => { },
  InputType: () => () => { },
  Info: () => () => { },
  Authorized: () => () => { },
  registerEnumType: () => { },
  createUnionType: () => Symbol(),
  Int: import("graphql").GraphQLScalarType,
  Float: import("graphql").GraphQLScalarType,
  ID: import("graphql").GraphQLScalarType
};
