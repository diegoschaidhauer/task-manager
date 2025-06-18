export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    dueDate: String
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User!
    tasks(status: String): [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createTask(title: String!, description: String, status: String, dueDate: String): Task!
    updateTask(id: ID!, title: String, description: String, status: String, dueDate: String): Task!
    deleteTask(id: ID!): Boolean!
  }
`;
