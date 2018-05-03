import gql from 'graphql-tag';

export const ALL_USERS = gql`
{
  allUsers {
    id
    firstname
    lastname
    email
    phone
    status
  }
}
`;

export const ADD_USER = gql`
  mutation($firstname: String!, $lastname: String!, $email: String!, $phone: String!, $status: Boolean!) {
    addUser(firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, status: $status) {
      ok
      user {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: Int!) {
    deleteUser(id: $id) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const USER = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      firstname
      lastname
      email
      phone
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: Int!, $firstname: String!, $lastname: String!, $email: String!, $status: Boolean!, $phone: String!) {
    updateUser(id: $id, firstname: $firstname, lastname: $lastname, email: $email, status: $status, phone: $phone) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
