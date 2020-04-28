import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosWithAuth from "../helpers/axios";
import Alert from "@material-ui/lab/Alert";
import { TextField } from "formik-material-ui";
import { Button } from "@material-ui/core";

function UserForm(props) {
	// const [token, setToken] = useStateWithLocalStorage("token", null);
	return (
		<Form>
			<h1>Login</h1>
			<br />

			{/* <Label>
				<b>Email:</b>
			</Label> */}
			<Field
				component={TextField}
				name="email"
				type="email"
				label="Email"
				placeholder="Email please?"
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
				<Alert color="danger">
					There was an error, please try again
				</Alert>
			)}
		</Form>
	);
}

const LoginForm = withFormik({
	mapPropsToValues({}) {
		return {
			email: "",
			password: "",
		};
	},

	validationSchema: yup.object().shape({
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
			.post("auth/login", {
				email: values.email,
				password: values.password,
			})
			.then((response) => {
				localStorage.setItem("token", response.data.token);

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
