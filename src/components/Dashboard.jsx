import React, { useState, useRef, useEffect } from "react";

import axiosWithAuth from "../helpers/axios";

import Grid from "@material-ui/core/Grid";

export default function Dashboard(props) {
	const canvas = useRef(null);
	let ctx = null;

	const [rooms, setRooms] = useState([[]]);
	const [player, setPlayer] = useState({
		x: 80 * 5,
		y: 80 * 5,
	});

	const amountOfRooms = 100;

	// const loadImages = () => {
	const imageURL = [
		"player.png",
		"ns.png",
		"we.png",
		"s.png",
		"w.png",
		"n.png",
		"all2.png",
		"wes.png",
		"nws.png",
		"wen.png",
		"nes.png",
		"ws.png",
		"wn.png",
		"ne.png",
		"es.png",
		"e.png",
		"all.png",
		// items, 17, 18, etc
		"coin/coin_1.png",
		"coin/coin_2.png",
		"coin/coin_3.png",
		"coin/coin_4.png",
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
		drawItems();
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
				let pr = response.data;
				console.dir(pr);

				const cords = {
					x: 0,
					y: 0,
				};

				// pr.sort((a, b) => {
				// 	return a.pk - b.pk;
				// });

				let allRooms = new Array(amountOfRooms);
				for (let i = 0; i < amountOfRooms; i++) {
					allRooms[i] = new Array(amountOfRooms);
				}

				const setUpRooms = (room, dir) => {
					// "dir" avoids going back the direction it came from so that it doesnt do an endless loop

					// room.items = [];

					allRooms[cords.y][cords.x] = room;

					if (room.n_to && dir !== "s") {
						cords.y -= 1;
						setUpRooms(
							pr.find((curr) => curr.id === room.n_to),
							"n"
						);
						cords.y += 1;
					}
					if (room.e_to && dir !== "w") {
						cords.x += 1;
						setUpRooms(
							pr.find((curr) => curr.id === room.e_to),
							"e"
						);
						cords.x -= 1;
					}
					if (room.s_to && dir !== "n") {
						cords.y += 1;
						setUpRooms(
							pr.find((curr) => curr.id === room.s_to),
							"s"
						);
						cords.y -= 1;
					}
					if (room.w_to && dir !== "e") {
						cords.x -= 1;
						setUpRooms(
							pr.find((curr) => curr.id === room.w_to),
							"w"
						);
						cords.x += 1;
					}
				};

				console.log(pr[0]);

				setUpRooms(pr[0], "n");
				setRooms(allRooms);

				// draw();
				// drawPlayer();
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// React.useEffect(() => {
	// 	ctx = canvas.current.getContext("2d");
	// }, []);

	// React.useEffect(() => {
	// 	ctx = canvas.current.getContext("2d");

	// 	ctx.fillStyle = "#25131a";
	// 	ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

	// 	drawRooms();
	// 	drawPlayer();
	// }, [player, rooms]);

	const drawRooms = () => {
		ctx = canvas.current.getContext("2d");
		console.log("rooms");

		ctx.fillStyle = "#25131a";
		ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

		for (let i = 0; i < rooms.length; i++) {
			for (let j = 0; j < rooms[i].length; j++) {
				if (rooms[i][j]) {
					let drawThisImage = images[1];

					// directions image of reference:
					// https://img.itch.zone/aW1hZ2UvNTcyMzk4LzMwMDk4OTUucG5n/347x500/P6B0xn.png

					// one direction
					if (rooms[i][j].n_to) {
						drawThisImage = images[5];
					}
					if (rooms[i][j].s_to) {
						drawThisImage = images[3];
					}
					if (rooms[i][j].w_to) {
						drawThisImage = images[4];
					}
					if (rooms[i][j].e_to) {
						drawThisImage = images[15];
					}

					// two directions: | -
					if (rooms[i][j].n_to && rooms[i][j].s_to) {
						drawThisImage = images[1];
					}
					if (rooms[i][j].e_to && rooms[i][j].w_to) {
						drawThisImage = images[2];
					}

					// tree directions: corners
					if (rooms[i][j].w_to && rooms[i][j].s_to) {
						drawThisImage = images[11];
					}
					if (rooms[i][j].w_to && rooms[i][j].n_to) {
						drawThisImage = images[12];
					}
					if (rooms[i][j].n_to && rooms[i][j].e_to) {
						drawThisImage = images[13];
					}
					if (rooms[i][j].s_to && rooms[i][j].e_to) {
						drawThisImage = images[14];
					}

					// 3 directions: t's
					if (
						rooms[i][j].w_to &&
						rooms[i][j].e_to &&
						rooms[i][j].s_to
					) {
						drawThisImage = images[7];
					}
					if (
						rooms[i][j].w_to &&
						rooms[i][j].s_to &&
						rooms[i][j].n_to
					) {
						drawThisImage = images[8];
					}
					if (
						rooms[i][j].w_to &&
						rooms[i][j].e_to &&
						rooms[i][j].n_to
					) {
						drawThisImage = images[9];
					}
					if (
						rooms[i][j].e_to &&
						rooms[i][j].s_to &&
						rooms[i][j].n_to
					) {
						drawThisImage = images[10];
					}

					// all directions
					if (
						rooms[i][j].n_to &&
						rooms[i][j].e_to &&
						rooms[i][j].s_to &&
						rooms[i][j].w_to
					) {
						drawThisImage = images[6];
					}

					ctx.drawImage(drawThisImage, j * 80, i * 80, 80, 80);
				} else {
					// draws room with no links
					// ctx.drawImage(images[16], j * 80, i * 80, 80, 80);
				}
			}
		}
	};

	const drawPlayer = () => {
		ctx = canvas.current.getContext("2d");

		ctx.drawImage(images[0], 16 * 2 + player.x, 16 * 2 + player.y, 16, 16);
	};

	let n = 17;
	const drawItems = () => {
		for (let i = 0; i < rooms.length; i++) {
			for (let j = 0; j < rooms[i].length; j++) {
				if (rooms[i][j]) {
					// console.log(rooms[i][j].items);
					ctx.drawImage(images[17], j * 80 + 16, i * 80 + 16, 16, 16);
					n++;
					console.log(n);

					if (n === 19) {
						n = 17;
					}
				}
			}
		}
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

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		console.log("1");
	// 	}, 1000);
	// 	return () => clearInterval(interval);
	// }, []);

	return (
		<Grid>
			<h1>Dashboard </h1>
			<br />

			<canvas ref={canvas} width={800} height={800}></canvas>
		</Grid>
	);
}
