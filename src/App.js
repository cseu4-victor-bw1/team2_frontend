import React, { useState } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";

import SiteNavbar from "./components/Navbar";
import { Route } from "react-router-dom";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import { Container } from "@material-ui/core";
import Dashboard from "./components/Dashboard";
import MainPage from "./components/MainPage";

function App() {
	return (
		<Container>
			<SiteNavbar />
			{/* <Route
				path="/"
				render={(props) => {
					return <SiteNavbar {...props} />;
				}}
			/> */}
			<Route
				exact
				path="/"
				render={(props) => {
					return <MainPage {...props} />;
				}}
			/>
			{/* <Route path="/" component={"Login"} /> */}
			<Route
				exact
				path="/register"
				render={(props) => {
					return <RegisterForm {...props} />;
				}}
			/>
			<Route
				exact
				path="/login"
				render={(props) => {
					return <LoginForm {...props} />;
				}}
			/>
			<Route
				exact
				path="/dashboard"
				render={(props) => {
					return <Dashboard {...props} />;
				}}
			/>{" "}
		</Container>
	);
}

export default App;
