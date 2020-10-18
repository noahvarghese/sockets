import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setStateFromElementChange } from "../Util/Functions";
import { setName } from "../redux/actions";

const ScreenName = ({ setName, ...props }) => {
	const path = "/serverID";

	let history = useHistory();

	const [state, setState] = useState({
		screenName: "",
	});

	return (
		<>
			<h2>Enter Your Screen Name</h2>
			<input
				name="screenName"
				type="text"
				aria-label="Screen Name"
				value={state.screenName}
				onChange={(e) => setStateFromElementChange(e, setState, state)}
			/>
			<button
				className="default"
				onClick={() => {
					setName(state.screenName);
					history.push(path);
				}}
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
