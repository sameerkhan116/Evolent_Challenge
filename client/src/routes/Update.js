import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import CustomForm from '../components/CustomForm';
import { UPDATE_USER } from '../graphql';

class Update extends Component {
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

  componentDidMount = () => {
    const {
      firstname, lastname, email, phone, status,
    } = this.props.location.state;

    this.setState({
      firstname,
      lastname,
      email,
      phone,
      status,
    });
  };


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
    const { id } = this.props.match.params;

    const response = await this.props.mutate({
      variables: {
        id,
        firstname,
        lastname,
        email,
        phone,
        status,
      },
    });

    console.log(response);

    const { ok, errors } = response.data.updateUser;

    if (ok) {
      this.props.history.push(`/user/${id}`);
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
        text="Update"
        firstname={firstname}
        lastname={lastname}
        email={email}
        phone={phone}
        status={status}
        firstnameError={firstnameError}
        lastnameError={lastnameError}
        emailError={emailError}
        phoneError={phoneError}
        statusError={statusError}
      />
    );
  }
}

export default graphql(UPDATE_USER)(Update);
