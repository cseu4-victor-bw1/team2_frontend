import React, { useState } from "react";
// import { Col, Row } from "reactstrap";

import { func } from "prop-types";
// import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	fab: {
		margin: theme.spacing(2),
		position: "fixed",
		bottom: 0,
		right: 0,
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
}));
export default function Dashboard(props) {
	// let history = useHistory();

	function Add(params) {
		// history.push("/joke");
	}
	const classes = useStyles();
	return (
		<Grid>
			{/* <Row> */}
			{/* <Col> */}
			<h1>Dashboard </h1>
			<br />
			{/* </Col> */}
			{/* </Row>
			<Row> */}
			<Fab
				color="primary"
				aria-label="add"
				className={classes.fab}
				onClick={(e) => {
					Add();
				}}
			>
				<AddIcon />
			</Fab>
			{/* </Row> */}
		</Grid>
	);
}
