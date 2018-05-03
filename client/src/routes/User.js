import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Container, Card, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { USER, DELETE_USER } from '../graphql';

const MutationButton = ({ id, history }) => (
  <Card.Content extra>
    <div className="ui two buttons">
      <Mutation mutation={DELETE_USER} key="delete">
        {(mutate, { loading, error }) => {
          if (loading) {
            return (
              <div>Loading...</div>
            );
          }
          if (error) {
            return (
              <div>Error</div>
            );
          }
          return (
            <Button
              color="red"
              basic
              fluid
              onClick={async () => {
              const response = await mutate({
                variables: { id },
              });
              console.log(response);
              history.push('/', null);
            }}
            >
            Delete this contact
            </Button>
          );
        }}
      </Mutation>
      <Query query={USER} variables={{ id }}>
        {({ loading, data }) => {
          if (loading) return null;
          const {
            firstname, lastname, email, phone, status,
          } = data.user;
          return (
            <Button
              basic
              color="teal"
              as={Link}
              to={{
                pathname: `/update/${id}`,
                state: {
                  firstname,
                  lastname,
                  email,
                  phone,
                  status,
                },
              }}
            >
              Update this user
            </Button>
          );
        }}
      </Query>
    </div>
  </Card.Content>
);

const QueryRender = ({ id, history }) => (
  <Query query={USER} variables={{ id }}>
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
      const {
        id, firstname, lastname, email, phone, status,
      } = data.user;
      return (
        <Card fluid centered>
          <Card.Content>
            <Card.Header>{`${firstname} ${lastname}`}</Card.Header>
            <Card.Meta><strong>Status:</strong> {status === false ? 'Inactice' : 'Active'}</Card.Meta>
            <Card.Description><strong>Email:</strong> {email}</Card.Description>
            <Card.Description><strong>Phone Number:</strong> {phone}</Card.Description>
          </Card.Content>
          <MutationButton id={id} history={history} />
        </Card>
      );
    }}
  </Query>
);

const User = ({ match: { params: { id } }, history }) => (
  <Container text>
    <QueryRender id={id} history={history} />
  </Container>
);

export default User;
