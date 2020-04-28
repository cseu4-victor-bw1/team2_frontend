import React, { useState } from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

import Alert from "@material-ui/lab/Alert";

import { TextField } from "formik-material-ui";
import { Button, Container } from "@material-ui/core";

const baseUrl = process.env.API_URL || "http://127.0.0.1:8000";

function UserForm(props) {
  return (
    <Container maxWidth="sm" className="container">
      <Form>
        <h1>Register</h1>
        <br />
        <Field
          component={TextField}
          name="username"
          type="text"
          label="Username"
          placeholder="Username please?"
          fullWidth
        />
        <Field
          component={TextField}
          name="email"
          type="email"
          label="Email"
          placeholder="Email please?"
          fullWidth
        />
        <Field
          component={TextField}
          name="password"
          type="password"
          label="Password"
          placeholder="Password please?"
          fullWidth
        />
        <Field
          component={TextField}
          name="password2"
          type="password"
          label="Password Confirm"
          placeholder="Password please?"
          fullWidth
        />
        <br /> <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <br />
        {props.status && props.status.error && (
          <Alert color="danger">There was an error, please try again</Alert>
        )}
      </Form>
    </Container>
  );
}

const RegisterForm = withFormik({
  mapPropsToValues({}) {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  },

  validationSchema: yup.object().shape({
    username: yup
      .string()
      .min(3, "Minimum 3 characters")
      .required("Username is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(3, "Minimum 3 characters")
      .required("Password is required"),
    password2: yup
      .string()
      .min(3, "Minimum 3 characters")
      .required("Password is required"),
  }),

  handleSubmit(values, { props, setStatus }) {
    axios
      .post(`${baseUrl}/api/registration/`, {
        username: values.username,
        email: values.email,
        password1: values.password,
        password2: values.password2,
      })
      .then((response) => {
        props.history.push("/login");
        console.log(response);
      })
      .catch((error) => {
        console.log(props);
        setStatus({ error: true });
        console.log(error);
      });
  },
})(UserForm);

export default RegisterForm;
