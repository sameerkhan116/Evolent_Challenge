import React from 'react';
import { List, Container, Message, Icon, Header } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { ALL_USERS } from '../graphql';

const user = u => (
  <List.Item key={u.id}>
    <List.Content floated="right">
      <List.Description><strong>Phone Number:</strong> +1{u.phone}</List.Description>
      <List.Description><strong>Status:</strong> {u.status === true ? 'Active' : 'Inactive'}</List.Description>
    </List.Content>
    <List.Content>
      <List.Header as={Link} to={`/user/${u.id}`}>{`${u.firstname} ${u.lastname}`}</List.Header>
      <List.Description><strong>Email:</strong> {u.email}</List.Description>
    </List.Content>
  </List.Item>
);

const Home = () => (
  <Container text>
    <Query query={ALL_USERS}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
              </Message.Content>
            </Message>
          );
        }
        if (error) {
          return (
            <Message negative>
              <Message.Header>Sorry, error encountered!</Message.Header>
              <p>Seems like you made a bad request</p>
            </Message>
          );
        }
        const { allUsers } = data;
        return [
          <Header
            as="h1"
            key="header"
            textAlign="center"
          >
            All Contacts
          </Header>,
          <List celled ordered key="list">
            {allUsers.map(user)}
          </List>,
        ];
      }}
    </Query>
  </Container>
);

export default Home;
