import * as url from "./url";
// import UseLocalStorage from "./uselocalstorage";
import axios from "axios";
import { useState } from "react";
import withBaseURL from "./url";

export default function axiosWithAuth(image = false) {
	const token = localStorage.getItem("token") || "";
	const instance = axios.create({
		baseURL: withBaseURL(),
		headers: {
			"Content-Type": image ? "multipart/form-data" : "application/json",
			Authorization: token,
			"X-CSRFToken":
				"CBDWogzRbI6gnpolDGwdSv4h1McqHdcvx9WQ0r0S4fSGtLUpAtoZw5EIyViOPlo6",
		},
	});

	return instance;
}
// headers: {'Content-Type': 'multipart/form-data' }
