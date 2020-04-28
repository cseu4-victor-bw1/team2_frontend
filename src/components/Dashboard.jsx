import React, { useState, useRef, useEffect } from "react";

import axiosWithAuth from "../helpers/axios";

import Grid from "@material-ui/core/Grid";

export default function Dashboard(props) {
	const canvas = useRef(null);
	let ctx = null;

	const [rooms, setRooms] = useState([[]]);
	const [player, setPlayer] = useState({
		x: 80 * 4,
		y: 80 * 5,
	});

	const amountOfRooms = 50;

	// const loadImages = () => {
	const imageURL = [
		"player.png",
		"all2.png",
		"all.png",
		"e.png",
		"es.png",
		"ne.png",
		"nes.png",
		"n.png",
		"ns.png",
		"nws.png",
		"s.png",
		"wen.png",
		"we.png",
		"wes.png",
		"wn.png",
		"w.png",
		"ws.png",
	]; // list of image URLs
	const images = []; /// array to hold images.
	var imageCount = 0; // number of loaded images;

	// function called once all images have loaded.
	function allLoaded() {
		// all images have loaded and can be rendered
		// ctx.drawImage(images[1], 0, 0); // draw background
		// ctx.drawImage(images[0], 0, 0); // draw foreground
		drawRooms();
		drawPlayer();
	}

	// iterate each image URL, create, load, and add it to the images array
	imageURL.forEach((src) => {
		// for each image url
		const image = new Image();
		image.src = src;
		image.onload = () => {
			imageCount += 1;
			if (imageCount === imageURL.length) {
				// have all loaded????
				allLoaded(); // call function to start rendering
			}
		};
		images.push(image); // add loading image to images array
	});
	// };

	React.useEffect(() => {
		axiosWithAuth()
			.get("adv/rooms")
			.then((response) => {
				// setjokeofDay(response.data);
				// props.values = response.data;
				// setRooms(response.data);
				let pr = JSON.parse(response.data.rooms);
				console.log(pr);

				const cords = {
					x: 5,
					y: 5,
				};

				pr.sort((a, b) => {
					return a.pk - b.pk;
				});
				console.log(pr);

				// pr.forEach((room) => {
				// 	console.log(room);
				// 	if (room.fields.n_to) {
				// 		cords.y += 1;
				// 	}
				// 	if (room.fields.s_to) {
				// 		cords.y -= 1;
				// 	}
				// 	if (room.fields.w_to) {
				// 		// left
				// 		cords.x -= 1;
				// 	}
				// 	if (room.fields.e_to) {
				// 		cords.x += 1;
				// 	}
				// 	allRooms[cords.x][cords.y] = 1;
				// });

				// draw();
				// drawPlayer();
			})
			.catch((error) => {
				console.log(error);
			});

		let allRooms = [];
		for (let i = 0; i < amountOfRooms; i++) {
			allRooms[i] = [];
			for (let j = 0; j < amountOfRooms; j++) {
				if (!!Math.floor(Math.random() * 2)) {
					allRooms[i][j] = 1;
				} else {
					allRooms[i][j] = null;
				}
			}
		}

		setRooms(allRooms);
	}, []);

	// React.useEffect(() => {
	// 	ctx = canvas.current.getContext("2d");
	// }, []);

	React.useEffect(() => {
		ctx = canvas.current.getContext("2d");

		ctx.fillStyle = "#25131a";
		ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

		drawRooms();
		drawPlayer();
	}, [player, rooms]);

	const drawRooms = () => {
		ctx = canvas.current.getContext("2d");

		for (let i = 0; i < rooms.length; i++) {
			for (let j = 0; j < rooms[i].length; j++) {
				if (rooms[i][j]) {
					// ctx.fillRect(j * 10, i * 10, 10, 10);
					ctx.drawImage(images[1], j * 80, i * 80, 80, 80);
				}
			}
		}
	};
	const drawPlayer = () => {
		ctx = canvas.current.getContext("2d");

		// ctx.fillStyle = "#FF0000";
		ctx.drawImage(images[0], 16 * 2 + player.x, 16 * 2 + player.y, 16, 16);
		// restores the color back because its painting the player first because the useEffect fires first
		// ctx.fillStyle = "#000000";
	};

	const onkeydown = (e) => {
		e = e || window.event;
		if (e.keyCode === 65 || e.keyCode === 37) {
			// left
			setPlayer({ ...player, x: player.x - 80 });
		} else if (e.keyCode === 87 || e.keyCode === 38) {
			// up
			setPlayer({ ...player, y: player.y - 80 });
		} else if (e.keyCode === 83 || e.keyCode === 40) {
			// down
			setPlayer({ ...player, y: player.y + 80 });
		} else if (e.keyCode === 68 || e.keyCode === 39) {
			// right
			setPlayer({ ...player, x: player.x + 80 });
		}
	};

	document.onkeydown = onkeydown;

	return (
		<Grid>
			<h1>Dashboard </h1>
			<br />

			<canvas ref={canvas} width={800} height={800}></canvas>
		</Grid>
	);
}
