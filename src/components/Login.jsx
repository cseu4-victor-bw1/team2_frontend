import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import withAuth from "../helpers/axios";
import Alert from "@material-ui/lab/Alert";
import { TextField } from "formik-material-ui";
import { Button, Container } from "@material-ui/core";

const baseUrl = process.env.API_URL || "http://127.0.0.1:8000";

function UserForm(props) {
  // const [token, setToken] = useStateWithLocalStorage("token", null);
  return (
    <Container maxWidth="sm" className="container">
      <Form>
        <h1>Login</h1>
        <br />
        {/* <Label>
				<b>Email:</b>
			</Label> */}
        <Field
          component={TextField}
          name="username"
          type="text"
          label="username"
          placeholder="Username please?"
          fullWidth
        />
        {/* <Label>
				<b>Password:</b>
			</Label> */}
        <Field
          component={TextField}
          name="password"
          type="password"
          label="password"
          placeholder="Password please?"
          fullWidth
        />
        <br />
        <br />
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

const LoginForm = withFormik({
  mapPropsToValues({}) {
    return {
      username: "",
      password: "",
    };
  },

  validationSchema: yup.object().shape({
    username: yup
      .string()
      .min(3, "Minimum 3 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(3, "Minimum 3 characters")
      .required("Password is required"),
  }),

	handleSubmit(values, { props, setStatus }) {
		axiosWithAuth()
			.post("auth/login", {
				email: values.email,
				password: values.password,
			})
			.then((response) => {
				localStorage.setItem("token", response.data.key);

        // setToken("response.data.token");

        props.history.push("/dashboard");

        console.log(response);
      })
      .catch((error) => {
        console.log(props);

        setStatus({ error: true });
        console.log(error);
      });
  },
})(UserForm);

export default LoginForm;
