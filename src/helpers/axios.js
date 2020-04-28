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
		},
	});

	return instance;
}
// headers: {'Content-Type': 'multipart/form-data' }
