export default `
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    email: String!
    phone: String!
    status: Boolean!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    addUser(firstname: String!, lastname: String!, email: String!, phone: String!, status: Boolean!): AddResponse!
    deleteUser(id: Int!): Response!
    updateUser(id: Int!, firstname: String!, lastname: String!, email: String!, phone: String!, status: Boolean!): Response!
  }
`;
