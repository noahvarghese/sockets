import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setName } from "../redux/actions";
import { socket } from "../config/Socket";

const ScreenName = ({ setName, ...props }) => {
	const path = "/serverID";

	let history = useHistory();

	const [state, setState] = useState({
		screenName: "",
		error: "",
	});
	console.log(socket.id);

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
						socket.emit("createName", state.screenName);
						socket.on("createNameResponse", (success) => {
							if (success) {
								setName(state.screenName);
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
	(_) => _,
	(dispatch) =>
		bindActionCreators(
			{
				setName: setName,
			},
			dispatch
		)
)(ScreenName);
