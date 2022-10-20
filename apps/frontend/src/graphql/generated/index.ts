// @ts-nocheck
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
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

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"]
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Contact = {
  __typename?: "Contact";
  firstname: Scalars["String"];
  id: Scalars["String"];
  lastname: Scalars["String"];
  number: Scalars["String"];
};

export type CreateContactInput = {
  firstname: Scalars["String"];
  lastname: Scalars["String"];
  number: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createContact: Contact;
  deleteContactById: Contact;
  updateContactById: Contact;
};

export type MutationCreateContactArgs = {
  contact: CreateContactInput;
};

export type MutationDeleteContactByIdArgs = {
  id: Scalars["String"];
};

export type MutationUpdateContactByIdArgs = {
  contactInfo: UpdateContactInput;
};

export type Query = {
  __typename?: "Query";
  getAllContacts: Array<Contact>;
  getContactById: Contact;
  searchByLastName: Array<Contact>;
};

export type QueryGetContactByIdArgs = {
  id: Scalars["String"];
};

export type QuerySearchByLastNameArgs = {
  lastname: Scalars["String"];
};

export type UpdateContactInput = {
  firstname?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  lastname?: InputMaybe<Scalars["String"]>;
  number?: InputMaybe<Scalars["String"]>;
};

export type CreateContactMutationVariables = Exact<{
  contact: CreateContactInput;
}>;

export type CreateContactMutation = {
  __typename?: "Mutation";
  createContact: {
    __typename?: "Contact";
    id: string;
    firstname: string;
    lastname: string;
    number: string;
  };
};

export type DeleteContactByIdMutationVariables = Exact<{
  deleteContactByIdId: Scalars["String"];
}>;

export type DeleteContactByIdMutation = {
  __typename?: "Mutation";
  deleteContactById: {
    __typename?: "Contact";
    id: string;
    firstname: string;
    lastname: string;
    number: string;
  };
};

export type UpdateContactByIdMutationMutationVariables = Exact<{
  contactInfo: UpdateContactInput;
}>;

export type UpdateContactByIdMutationMutation = {
  __typename?: "Mutation";
  updateContactById: {
    __typename?: "Contact";
    id: string;
    firstname: string;
    lastname: string;
    number: string;
  };
};

export type GetAllContactsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllContactsQuery = {
  __typename?: "Query";
  getAllContacts: Array<{
    __typename?: "Contact";
    id: string;
    firstname: string;
    lastname: string;
    number: string;
  }>;
};

export type GetContactByIdQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetContactByIdQuery = {
  __typename?: "Query";
  getContactById: {
    __typename?: "Contact";
    id: string;
    firstname: string;
    lastname: string;
    number: string;
  };
};

export type SearchByLastNameQueryVariables = Exact<{
  lastname: Scalars["String"];
}>;

export type SearchByLastNameQuery = {
  __typename?: "Query";
  searchByLastName: Array<{
    __typename?: "Contact";
    id: string;
    firstname: string;
    lastname: string;
    number: string;
  }>;
};

export const CreateContactDocument = `
    mutation CreateContact($contact: CreateContactInput!) {
  createContact(contact: $contact) {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useCreateContactMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateContactMutation,
    TError,
    CreateContactMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    CreateContactMutation,
    TError,
    CreateContactMutationVariables,
    TContext
  >(
    ["CreateContact"],
    (variables?: CreateContactMutationVariables) =>
      fetcher<CreateContactMutation, CreateContactMutationVariables>(
        client,
        CreateContactDocument,
        variables,
        headers
      )(),
    options
  );
export const DeleteContactByIdDocument = `
    mutation DeleteContactById($deleteContactByIdId: String!) {
  deleteContactById(id: $deleteContactByIdId) {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useDeleteContactByIdMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteContactByIdMutation,
    TError,
    DeleteContactByIdMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    DeleteContactByIdMutation,
    TError,
    DeleteContactByIdMutationVariables,
    TContext
  >(
    ["DeleteContactById"],
    (variables?: DeleteContactByIdMutationVariables) =>
      fetcher<DeleteContactByIdMutation, DeleteContactByIdMutationVariables>(
        client,
        DeleteContactByIdDocument,
        variables,
        headers
      )(),
    options
  );
export const UpdateContactByIdMutationDocument = `
    mutation UpdateContactByIdMutation($contactInfo: UpdateContactInput!) {
  updateContactById(contactInfo: $contactInfo) {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useUpdateContactByIdMutationMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateContactByIdMutationMutation,
    TError,
    UpdateContactByIdMutationMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    UpdateContactByIdMutationMutation,
    TError,
    UpdateContactByIdMutationMutationVariables,
    TContext
  >(
    ["UpdateContactByIdMutation"],
    (variables?: UpdateContactByIdMutationMutationVariables) =>
      fetcher<
        UpdateContactByIdMutationMutation,
        UpdateContactByIdMutationMutationVariables
      >(client, UpdateContactByIdMutationDocument, variables, headers)(),
    options
  );
export const GetAllContactsDocument = `
    query GetAllContacts {
  getAllContacts {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useGetAllContactsQuery = <
  TData = GetAllContactsQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: GetAllContactsQueryVariables,
  options?: UseQueryOptions<GetAllContactsQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<GetAllContactsQuery, TError, TData>(
    variables === undefined
      ? ["GetAllContacts"]
      : ["GetAllContacts", variables],
    fetcher<GetAllContactsQuery, GetAllContactsQueryVariables>(
      client,
      GetAllContactsDocument,
      variables,
      headers
    ),
    options
  );
export const GetContactByIdDocument = `
    query GetContactById($id: String!) {
  getContactById(id: $id) {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useGetContactByIdQuery = <
  TData = GetContactByIdQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: GetContactByIdQueryVariables,
  options?: UseQueryOptions<GetContactByIdQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<GetContactByIdQuery, TError, TData>(
    ["GetContactById", variables],
    fetcher<GetContactByIdQuery, GetContactByIdQueryVariables>(
      client,
      GetContactByIdDocument,
      variables,
      headers
    ),
    options
  );
export const SearchByLastNameDocument = `
    query SearchByLastName($lastname: String!) {
  searchByLastName(lastname: $lastname) {
    id
    firstname
    lastname
    number
  }
}
    `;
export const useSearchByLastNameQuery = <
  TData = SearchByLastNameQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables: SearchByLastNameQueryVariables,
  options?: UseQueryOptions<SearchByLastNameQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<SearchByLastNameQuery, TError, TData>(
    ["SearchByLastName", variables],
    fetcher<SearchByLastNameQuery, SearchByLastNameQueryVariables>(
      client,
      SearchByLastNameDocument,
      variables,
      headers
    ),
    options
  );
