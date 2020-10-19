import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setName } from "../redux/actions";
import socketIOClient from "socket.io-client";
import "dotenv/config";

const ScreenName = ({ setName, ...props }) => {
	const path = "/serverID";
	const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT!);

	let history = useHistory();

	const [state, setState] = useState({
		screenName: "",
		error: "",
	});

	return (
		<>
			<h2>Enter Your Screen Name</h2>
			<input
				name="screenName"
				type="text"
				aria-label="Screen Name"
				value={state.screenName}
				onChange={(e) => {
					const name = e.target.value;
					let error = "";
					socket.emit("checkName", name);
					socket.on("checkNameResponse", (exists) => {
						console.log(exists);
						if (exists) {
							error = "Name already taken";
						}

						setState({
							screenName: name,
							error: error,
						});
					});
				}}
			/>
			<span className="error">{state.error}</span>
			<button
				className="default"
				onClick={() => {
					if (state.error === "") {
						socket.on("connect", () => {
							socket.emit("createName", state.screenName);
						});
						setName(state.screenName);
						socket.emit("getNames");
						// history.push(path);
					}
				}}
				disabled={state.error !== ""}
			>
				Continue
			</button>
		</>
	);
};

export default connect(
	(_) => _,
	(dispatch) =>
		bindActionCreators(
			{
				setName: setName,
			},
			dispatch
		)
)(ScreenName);
