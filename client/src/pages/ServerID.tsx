import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { setStateFromInputChange } from "../Util/Functions";

const ServerID = ({ role, setGlobalState, ...props }) => {
	const key = "server";
	const path = `/${role.toLowerCase()}`;

	let history = useHistory();

	const [state, setState] = useState({ serverID: "" });

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
				onChange={(e) => setStateFromInputChange(e, setState, state)}
			/>
			<input
				type="submit"
				value="Continue"
				onClick={(e) => {
					setGlobalState(e, key, state.serverID);
					history.push(path);
				}}
			/>
		</>
	);
};

export default ServerID;
