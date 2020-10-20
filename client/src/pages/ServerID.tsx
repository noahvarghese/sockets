import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setServer } from "../redux/actions";
// import { socket } from "../config/Socket";

const ServerID = ({ role, setServer, name, socket, ...props }) => {
	const path = "/home";

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
						if (exists && role === "Teacher") {
							error = "Server name already taken";
						} else if (!exists && role === "Student") {
							error = "Server does not exist, check your spelling or retry.";
						}

						setState({
							serverID: server,
							error: error,
						});
					});
				}}
			/>
			<span className="error">{state.error}</span>
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
						socket.emit("joinServer", state.serverID);
						history.push(path);
					}
				}}
				disabled={state.error !== "" || state.serverID === ""}
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
