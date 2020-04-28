import React, { useState } from "react";
import { Link } from "react-router-dom";

import { NavLink as RRNavLink } from "react-router-dom";

import useStateWithLocalStorage from "../helpers/uselocalstorage";

export default function SiteNavbar() {
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => {
		if (window.innerWidth <= 800) {
			setOpen(!dropdownOpen);
		}
	};

	const [token, setToken] = useStateWithLocalStorage("token", null);

	React.useEffect(() => {
		setToken(localStorage.getItem("token") || "");
	});

	return <>{token ? "links logged in" : "links logged in"}</>;
}
