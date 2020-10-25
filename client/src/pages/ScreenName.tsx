import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setName } from "../redux/actions";
import state from "../components/InterfaceDefaults/StateProps";

const ScreenName = ({ role, name, setName, socket, ...props }) => {
	const path = "/serverID";

	let history = useHistory();

	const [err, setErr] = useState("");

	return (
		<>
			<h1>Welcome</h1>
			<hr />
			<h2>Enter Your Screen Name</h2>
			<input
				name="screenName"
				type="text"
				aria-label="Screen Name"
				value={name}
				onChange={(e) => {
					const nameInput = e.target.value;
					socket.emit("checkName", name);
					socket.on("checkNameResponse", (exists) => {
						let error = "";
						if (exists) {
							error = "Name already taken";
						}

						setErr(error);
						setName(nameInput);
					});
				}}
			/>
			<span className="error">{err}</span>
			<button
				className="default"
				onClick={() => {
					if (err === "") {
						socket.emit("createName", [{ name: name, role: role }]);
						// socket.emit("createName", state.screenName);
						socket.on("createNameResponse", (success) => {
							if (success) {
								history.push(path);
							} else {
								setErr("This name is taken, please try another");
							}
						});
					}
				}}
				disabled={err !== "" || name === ""}
			>
				Continue
			</button>
		</>
	);
};

export default connect(
	(state: state) => ({ role: state.info.role, name: state.info.name }),
	(dispatch) =>
		bindActionCreators(
			{
				setName: setName,
			},
			dispatch
		)
)(ScreenName);
