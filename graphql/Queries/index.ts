import { gql } from '@apollo/client';

export const FDA_QUERY = gql`
  query FDA {
    post(id: "cG9zdDoyOTE5") {
      content
    }
  }
`;

export const LEGAL_MENU_QUERY = gql`
  query MyQuery {
    menu(id: "dGVybToyNQ==") {
      menuItems {
        nodes {
          url
          label
          id
        }
      }
    }
  }
`;