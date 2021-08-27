// Define the necessary Query and Mutation Types:
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
      _id: ID
      username: String!
      email: String!
      password: String!
      savedBooks: [Book]
      bookCount: Int
  }

  type Book {
      bookId: String!
      authors: [String]
      description: String
      title: String!
      image: String
      link: String
  }

  type Auth {
      token: String
      user: [User]
  }

  type Query {
      me(email: String!): [User]
  }

  type Mutation {
      loginUser(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook(content: saveBookContent!): User
      removeBook(bookId: String!): User
  }

  input saveBookContent {
      authors: [String]
      description: String!
      title: String!
      bookId: String!
      image: String
      link: String
  }`;

module.exports = typeDefs;

// Query Type:
//   me: returns a User type

// Mutation Type:
//  login: accepts an email and password as params, returns an Auth type
//  addUser: accepts username, email, and password as params, returns an Auth type
//  saveBook: accepts a book author's array, description, title, bookId, image and link as params, returns a User type (Look into creating whats known as an input type to handle all of these parameters!)
//  removeBook: accepts a book's bookId as a parameter, returns a User type

// User Type:
//  _id, username, email, bookCount, savedBooks(array of Book)

// Book Type:
// bookId, authors[array of strings], description, title, image, link

// Auth type:
//  token, user (References User type)