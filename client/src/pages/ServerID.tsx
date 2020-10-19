import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setServer } from "../redux/actions";
import socketIOClient from "socket.io-client";

const ServerID = ({ role, setServer, ...props }) => {
	const path = "/home";
	const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT!);

	let history = useHistory();

	const [state, setState] = useState({ serverID: "", error: "" });

	return (
		<>
			<h2>
				{role === "Teacher"
					? "Create A Custom Server ID"
					: "Enter The Server ID"}
			</h2>
			<input
				name="serverID"
				type="text"
				aria-label="Server ID"
				value={state.serverID}
				onChange={(e) => {
					const server = e.target.value;
					let error = "";
					socket.emit("checkServer", server);
					socket.on("checkServerResponse", (exists) => {
						if (exists) {
							error = "Server name already taken";
						}

						setState({
							serverID: server,
							error: error,
						});
					});
				}}
			/>
			<button
				className="default"
				onClick={() => {
					socket.emit("createServer", state.serverID);
					socket.on("createServerResponse", (err) => {
						if (!err) {
							setServer(state.serverID);
							history.push(path);
						}
					});
				}}
				disabled={state.error !== ""}
			>
				Continue
			</button>
		</>
	);
};

export default connect(
	(state) => state.info,
	(dispatch) =>
		bindActionCreators(
			{
				setServer: setServer,
			},
			dispatch
		)
)(ServerID);
