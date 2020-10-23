import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setServer } from "../redux/actions";
import state from "../components/InterfaceDefaults/StateProps";

const ServerID = ({ name, server, role, setServer, socket, ...props }) => {
	const path = "/home";

	let history = useHistory();

	const [err, setErr] = useState("");

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
				value={server}
				onChange={(e) => {
					const serverInput = e.target.value;
					let error = "";
					socket.emit("checkServer", serverInput);
					socket.on("checkServerResponse", (exists) => {
						if (exists && role === "Teacher") {
							error = "Server name already taken";
						} else if (!exists && role === "Student") {
							error = "Server does not exist, check your spelling or retry.";
						}
						setServer(serverInput);
						setErr(error);
					});
				}}
			/>
			<span className="error">{err}</span>
			<button
				className="default"
				onClick={() => {
					if (role === "Teacher") {
						socket.emit("createServer", [{ name: name, server: server }]);
						socket.on("createServerResponse", (success) => {
							if (success) {
								setServer(server);
								history.push(path);
							}
						});
					} else if (role === "Student") {
						socket.emit("joinServer", server);
						setServer(server);
						history.push(path);
					}
				}}
				disabled={err !== "" || server === ""}
			>
				Continue
			</button>
		</>
	);
};

export default connect(
	(state: state) => state.info,
	(dispatch) =>
		bindActionCreators(
			{
				setServer: setServer,
			},
			dispatch
		)
)(ServerID);
