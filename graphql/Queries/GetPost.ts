import { gql } from '@apollo/client';

export const GET_POST = gql`
  query getPost($id: ID!) {
    page(id: $id, idType: URI) {
      databaseId
      content
      link
      title
    }
  }
`;

export const GET_NEWS_POST = gql`
  query getPost($id: ID!) {
    page(id: $id, idType: URI) {
      databaseId
      content
      link
      title
    }
  }
`;
