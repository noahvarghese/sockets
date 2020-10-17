import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Role from "./pages/Role";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	const [state, setState] = useState({
		name: "",
		role: "",
		server: "",
		questionType: "",
		score: 0,
		time: 0,
	});

	const transferStateOnClick = (
		e: React.MouseEvent,
		key: String,
		value: String
	) => {
		e.preventDefault();
		setState({
			...state,
			[key as string]: value,
		});
	};

	return (
		<Router>
			{!state.name || !state.server || !state.role ? <h1>Welcome</h1> : null}
			<Route
				path="/"
				exact
				render={() => <Role setGlobalState={transferStateOnClick} />}
			/>
			<ProtectedRoute
				tag="screenName"
				state={state}
				subProps={{ setGlobalState: transferStateOnClick }}
			/>
			<ProtectedRoute
				tag="serverID"
				state={state}
				subProps={{ setGlobalState: transferStateOnClick, role: state.role }}
			/>
			<ProtectedRoute
				tag="teacher"
				state={state}
				subProps={{ setGlobalState: transferStateOnClick }}
			/>
			<ProtectedRoute
				tag="student"
				state={state}
				subProps={{ setGlobalState: transferStateOnClick }}
			/>
		</Router>
	);
};

export default App;
