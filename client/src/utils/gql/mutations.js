import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
          token
          user
      }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
          token
          user
      }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($content: saveBookContent!) {
      saveBook(content: $content) {
          username
          email
          savedBooks
          bookCount
      }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
      removeBook(bookId: $bookId) {
          username
          email
          savedBooks
          bookCount
      }
  }
`;
