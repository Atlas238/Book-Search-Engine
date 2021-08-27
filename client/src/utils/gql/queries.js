import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me($email: String!) {
      me(email: $email) {
          _id
          username
          email
          password
          savedBooks
          bookCount
      }
  }
`;