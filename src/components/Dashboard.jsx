import React, { useState, useRef, useEffect } from "react";

import axiosWithAuth from "../helpers/axios";

import Grid from "@material-ui/core/Grid";

export default function Dashboard(props) {
	const canvas = useRef(null);
	let ctx = null;

	const [moveResponse, setMoveResponse] = useState(null);
	const [rooms, setRooms] = useState([[]]);
	const [player, setPlayer] = useState({
		x: 0,
		y: 0,
	});

	const amountOfRooms = 10;

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

		// "box_1/box_1_1.png",
		// "box_1/box_1_2.png",
		// "box_1/box_1_3.png",
		// "box_1/box_1_4.png",

		"chest/chest_1.png",
		"chest/chest_2.png",
		"chest/chest_3.png",
		"chest/chest_4.png",

		"flag/flag_1.png",
		"flag/flag_2.png",
		"flag/flag_3.png",
		"flag/flag_4.png",

		"player/priest3_v2_1.png",
		"player/priest3_v2_2.png",
		"player/priest3_v2_3.png",
		"player/priest3_v2_4.png",

		"ladder.png",

		"arrow/arrow_1.png",
		"arrow/arrow_2.png",
		"arrow/arrow_3.png",
		"arrow/arrow_4.png",

		"peaks/peaks_1.png",
		"peaks/peaks_2.png",
		"peaks/peaks_3.png",
		"peaks/peaks_4.png",
	]; // list of image URLs

	const images = []; /// array to hold images.
	var imageCount = 0; // number of loaded images;

	// function called once all images have loaded.
	function allLoaded() {
		// all images have loaded and can be rendered
		ctx = canvas.current.getContext("2d");
		drawRooms(ctx);
		drawPlayer(ctx);
		drawItems(ctx);
		drawFlags(ctx);

		ctx.drawImage(images[33], 9 * 80 + 16 * 2, 9 * 80 + 16 * 2, 16, 16);
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

	React.useEffect(() => {
		axiosWithAuth()
			.get("adv/rooms/")
			.then(async (response) => {
				await axiosWithAuth()
					.get("adv/init/")
					.then((response) => {
						setMoveResponse(response);
						console.log(response.data);
					})
					.catch((error) => {
						console.log(error);
					});

				let pr = response.data;

				const cords = {
					x: 0,
					y: 0,
				};

				let allRooms = new Array(amountOfRooms);
				for (let i = 0; i < amountOfRooms; i++) {
					allRooms[i] = new Array(amountOfRooms);
				}

				const setUpRooms = (room, dir) => {
					// "dir" avoids going back the direction it came from so that it doesnt do an endless loop

					room.items = [];

					if (Math.floor(Math.random() * 20) + 1 === 1) {
						room.items.push("coins");
					}
					if (Math.floor(Math.random() * 50) + 1 === 1) {
						room.items.push("chest");
					}

					if (room.e_to) {
						if (Math.floor(Math.random() * 5) + 1 === 1) {
							room.items.push("arrows");
						}
					}

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

				setUpRooms(pr[0]);
				setRooms(allRooms);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const drawRooms = (ctx) => {
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

	const drawPlayer = (ctx) => {
		ctx.drawImage(
			images[frame + 28],
			player.x * 80 + 16 * 2,
			player.y * 80 + 16 * 2,
			16,
			16
		);
		// ctx.drawImage(images[frame + 24], 0 + 16 * 2, 0, 16, 16);
	};
	const drawFlags = (ctx) => {
		ctx.drawImage(images[frame + 24], 0 + 16 * 2, 0, 16, 16);
		ctx.drawImage(images[frame + 24], 9 * 80 + 16 * 2, 9 * 80 + 0, 16, 16);
	};

	const drawItems = (ctx) => {
		for (let i = 0; i < rooms.length; i++) {
			for (let j = 0; j < rooms[i].length; j++) {
				if (rooms[i][j].items.length > 0) {
					if (rooms[i][j].items.includes("coins")) {
						ctx.drawImage(
							images[frame + 16],
							j * 80 + 48, // 16*3 = 48
							i * 80 + 48, // 16*3 = 48
							16,
							16
						);
					}
					if (rooms[i][j].items.includes("chest")) {
						ctx.drawImage(
							images[frame + 20],
							j * 80 + 16,
							i * 80 + 16,
							16,
							16
						);
					}
					if (rooms[i][j].items.includes("arrows")) {
						ctx.drawImage(
							images[frame + 37],
							j * 80 + 16 * 4,
							i * 80 + 15 * 2,
							16,
							16
						);
					}
				}
			}
		}
		// console.log("one sec");
	};

	let frame = 1;
	useEffect(() => {
		const interval = setInterval(() => {
			ctx = canvas.current.getContext("2d");
			// console.log(ctx);

			drawRooms(ctx);
			drawPlayer(ctx);
			drawItems(ctx);
			drawFlags(ctx);

			ctx.drawImage(images[33], 9 * 80 + 16 * 2, 9 * 80 + 16 * 2, 16, 16);

			frame++;
			if (frame === 5) {
				frame = 1;
			}
		}, 1000 / 4);
		return () => clearInterval(interval);
	}, [rooms, player]);

	const onkeydown = async (e) => {
		e = e || window.event;

		let direction = "";
		switch (e.keyCode) {
			case 65: //A
			case 37: // <--
				// left
				direction = "w";
				break;
			case 87:
			case 38:
				// up
				direction = "n";
				break;
			case 83:
			case 40:
				// down
				direction = "s";
				break;
			case 68:
			case 39:
				// right
				direction = "e";
				break;
			default:
				console.log("invalid input");
				break;
		}

		await axiosWithAuth()
			.post("adv/move/", {
				direction: direction,
			})
			.then((response) => {
				setMoveResponse(response);

				if (response.data.error_msg) {
					return;
				}

				switch (e.keyCode) {
					case 65: //A
					case 37: // <--
						// left
						if (player.x - 1 < 0) {
							return;
						}
						setPlayer({ ...player, x: player.x - 1 });
						break;
					case 87:
					case 38:
						// up
						if (player.y - 1 < 0) {
							return;
						}
						setPlayer({ ...player, y: player.y - 1 });
						break;
					case 83:
					case 40:
						// down
						if (player.y + 1 >= amountOfRooms) {
							return;
						}
						setPlayer({ ...player, y: player.y + 1 });
						break;
					case 68:
					case 39:
						// right
						if (player.x + 1 >= amountOfRooms) {
							return;
						}
						setPlayer({ ...player, x: player.x + 1 });
						break;
					default:
						console.log("invalid input");

						break;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	document.onkeydown = onkeydown;

	return (
		<Grid>
			<h1 style={{ color: "white" }}>Game</h1>
			<br />
			<div style={{ display: "flex" }}>
				<canvas ref={canvas} width={800} height={800}></canvas>
				{moveResponse && (
					<div
						style={{
							color: "white",
							backgroundColor: "#25131a",
							marginLeft: "20px",
							padding: "20px",
						}}
					>
						<span>
							<b>Title</b>: {moveResponse.data.title}
						</span>
						<br />
						<br />
						<span>
							<b>Description</b>: {moveResponse.data.description}
						</span>
					</div>
				)}
			</div>
		</Grid>
	);
}
