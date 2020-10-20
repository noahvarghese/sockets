import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setName } from "../redux/actions";
// import { socket } from "../config/Socket";

const ScreenName = ({ role, setName, socket, ...props }) => {
	const path = "/serverID";

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
						socket.emit("createName", [{ name: state.screenName, role: role }]);
						// socket.emit("createName", state.screenName);
						socket.on("createNameResponse", (success) => {
							if (success) {
								setName(state.screenName);
								history.push(path);
							} else {
								setState({
									...state,
									error: "This name is taken, please try another",
								});
							}
						});
					}
				}}
				disabled={state.error !== "" || state.screenName === ""}
			>
				Continue
			</button>
		</>
	);
};

export default connect(
	(state) => {
		return { role: state.info.role };
	},
	(dispatch) =>
		bindActionCreators(
			{
				setName: setName,
			},
			dispatch
		)
)(ScreenName);
