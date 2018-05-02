import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Header, Container, Form, Button, Message, Segment } from 'semantic-ui-react';

import { ADD_USER, ALL_USERS as query } from '../graphql';

class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    status: true,
    firstnameError: '',
    lastnameError: '',
    emailError: '',
    phoneError: '',
    statusError: '',
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }


  onSubmit = async () => {
    const {
      firstname, lastname, email, phone, status,
    } = this.state;

    const response = await this.props.mutate({
      variables: {
        firstname,
        lastname,
        email,
        phone,
        status,
      },
      optimisticResponse: {
        addUser: {
          __typename: 'Mutation',
          ok: true,
          user: {
            __typename: 'User',
            id: -1,
            firstname,
            lastname,
            email,
            phone,
            status,
          },
          errors: {
            __typename: 'Error',
            path: '',
            message: '',
          },
        },
      },
      update: (proxy, { data: { addUser } }) => {
        console.log(proxy);
        const data = proxy.readQuery({ query });
        data.allUsers.push(addUser);
        proxy.writeQuery({ query, data });
      },
    });

    console.log(response);

    const { ok, user, errors } = response.data.addUser;

    if (ok) {
      this.props.history.push(`/user/${user.id}`);
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  }

  handleChange = (e, { value }) => {
    const status = (value !== '0');
    this.setState({
      status,
    });
  }

  render() {
    const {
      firstname, lastname, email, phone, status,
      firstnameError, lastnameError, emailError, phoneError, statusError,
    } = this.state;

    const errorList = [];
    if (firstnameError) errorList.push(firstnameError);
    if (lastnameError) errorList.push(lastnameError);
    if (emailError) errorList.push(emailError);
    if (phoneError) errorList.push(phoneError);
    if (statusError) errorList.push(statusError);

    return [
      <Header as="h1" key="header" textAlign="center">Add Contact</Header>,
      <Container text key="form">
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                type="text"
                label="First Name"
                value={firstname}
                name="firstname"
                placeholder="First Name"
                onChange={this.onChange}
                error={!!firstnameError}
                required
              />
              <Form.Input
                type="text"
                label="Last Name"
                value={lastname}
                name="lastname"
                placeholder="Last Name"
                onChange={this.onChange}
                error={!!lastnameError}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                type="email"
                label="Email"
                value={email}
                name="email"
                placeholder="Email"
                onChange={this.onChange}
                error={!!emailError}
                required
              />
              <Form.Input
                type="number"
                label="Phone Number"
                value={phone}
                name="phone"
                maxLength="10"
                placeholder="Phone Number"
                onChange={this.onChange}
                error={!!phoneError}
                required
              />
            </Form.Group>
            <Form.Group inline>
              <label htmlFor="status">Status:</label>
              <Form.Radio
                label="Active"
                value="1"
                checked={status === true}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="Inactive"
                value="0"
                checked={status === false}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </Segment>
        <Button
          fluid
          color="green"
          key="button"
          onClick={this.onSubmit}
        >
          ADD!
        </Button>
        {errorList.length ? (
          <Message error header="Something went wrong" list={errorList} />
        ) : null}
      </Container>,
    ];
  }
}

export default graphql(ADD_USER)(Register);
