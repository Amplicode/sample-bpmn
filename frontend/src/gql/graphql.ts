/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** BigDecimal */
  BigDecimal: any;
  /** BigInteger */
  BigInteger: any;
  /** Byte */
  Byte: any;
  /** Char */
  Char: any;
  /** Date */
  Date: any;
  /** DateTime */
  DateTime: any;
  /** LocalDate */
  LocalDate: any;
  /** LocalDateTime */
  LocalDateTime: any;
  /** LocalTime */
  LocalTime: any;
  /** Long */
  Long: any;
  /** OffsetDateTime */
  OffsetDateTime: any;
  /** OffsetTime */
  OffsetTime: any;
  /** Short */
  Short: any;
  /** Time */
  Time: any;
  /** UUID */
  UUID: any;
  /** Void */
  Void: any;
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
};

/** Query root */
export type Query = {
  __typename?: "Query";
};
