import React, { useState } from "react";
import axiosWithAuth from "../helpers/axios";

export default function MainPage(props) {
	// const [jokeofDay, setjokeofDay] = useState({});

	const getJokeofday = () => {};

	React.useEffect(() => {
		axiosWithAuth()
			.get("public/jokes/thehour")
			.then((response) => {
				// setjokeofDay(response.data);
				// props.values = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="mainpage">
			<h1 className="hourJoke">Main page?</h1>
			{/* <Row>
				<JokesList {...props} api="public/jokes/popular" />
			</Row> */}
		</div>
	);
}
