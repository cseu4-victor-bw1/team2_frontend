import React, { useState } from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosWithAuth from "../helpers/axios";

import Alert from "@material-ui/lab/Alert";

import { TextField } from "formik-material-ui";
import { Button } from "@material-ui/core";

function UserForm(props) {
	return (
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

			<Button variant="contained" color="primary" type="submit">
				Submit
			</Button>
			<br />
			{props.status && props.status.error && (
				<Alert color="danger">
					There was an error, please try again
				</Alert>
			)}
		</Form>
	);
}

const RegisterForm = withFormik({
	mapPropsToValues({}) {
		return {
			username: "",
			email: "",
			password: "",
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
	}),

	handleSubmit(values, { props, setStatus }) {
		axiosWithAuth()
			.post("auth/register", {
				username: values.username,
				email: values.email,
				password: values.password,
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
