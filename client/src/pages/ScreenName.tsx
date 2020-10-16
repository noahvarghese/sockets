import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { setStateFromInputChange } from "../Util/Functions";

const ScreenName = ({ setGlobalState, ...props }) => {
	const key = "name";
	const path = "/serverID";

	let history = useHistory();

	const [state, setState] = useState({
		screenName: "",
	});

	return (
		<>
			<h2>Enter Your Screen Name</h2>
			<p>(No spaces)</p>
			<input
				name="screenName"
				type="text"
				aria-label="Screen Name"
				value={state.screenName}
				onChange={(e) => setStateFromInputChange(e, setState, state)}
			/>
			<input
				type="submit"
				value="Continue"
				onClick={(e) => {
					setGlobalState(e, key, state.screenName);
					history.push(path);
				}}
			/>
		</>
	);
};

export default ScreenName;
