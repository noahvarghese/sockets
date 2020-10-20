import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setServer } from "../redux/actions";
import { socket } from "../config/Socket";

const ServerID = ({ role, setServer, name, ...props }) => {
	const path = "/home";

	let history = useHistory();
	console.log(socket.id);

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
					if (role === "Teacher") {
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
					} else if (role === "Student") {
						setState({
							...state,
							serverID: server,
						});
					}
				}}
			/>
			<button
				className="default"
				onClick={() => {
					if (role === "Teacher") {
						socket.emit("createServer", [
							{ name: name, server: state.serverID },
						]);
						socket.on("createServerResponse", (success) => {
							if (success) {
								setServer(state.serverID);
								history.push(path);
							}
						});
					} else if (role === "Student") {
						socket.emit("addToServer", (success) => {
							if (success) {
								setServer(state.serverID);
								history.push(path);
							}
						});
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
	(state) => state.info,
	(dispatch) =>
		bindActionCreators(
			{
				setServer: setServer,
			},
			dispatch
		)
)(ServerID);
