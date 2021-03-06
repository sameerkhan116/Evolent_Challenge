import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import CustomForm from '../components/CustomForm';
import { ADD_USER } from '../graphql';

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

    return (
      <CustomForm
        change={this.onChange}
        handleChange={this.handleChange}
        submit={this.onSubmit}
        errorList={errorList}
        text="Add"
        firstname={firstname}
        lastname={lastname}
        email={email}
        phone={phone}
        status={status}
        firstnameError={firstnameError}
        lastnameError={lastnameError}
        emailError={emailError}
        phoneError={phoneError}
      />
    );
  }
}

export default graphql(ADD_USER)(Register);
