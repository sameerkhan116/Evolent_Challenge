import React from 'react';
import { Header, Container, Form, Button, Message, Segment } from 'semantic-ui-react';

const CustomForm = ({
  firstname, lastname, email, phone, status,
  firstnameError, lastnameError, emailError, phoneError,
  text, change, submit, errorList, handleChange,
}) => [
  <Header as="h1" key="header" textAlign="center">{text} Contact</Header>,
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
            onChange={change}
            error={!!firstnameError}
            required
          />
          <Form.Input
            type="text"
            label="Last Name"
            value={lastname}
            name="lastname"
            placeholder="Last Name"
            onChange={change}
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
            onChange={change}
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
            onChange={change}
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
            onChange={handleChange}
          />
          <Form.Radio
            label="Inactive"
            value="0"
            checked={status === false}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Segment>
    <Button
      fluid
      color="green"
      key="button"
      onClick={submit}
    >
      {text}!
    </Button>
    {errorList.length ? (
      <Message error header="Something went wrong" list={errorList} />
    ) : null}
  </Container>,
];

export default CustomForm;
