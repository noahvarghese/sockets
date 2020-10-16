import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Role from "./pages/Role";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	const [state, setState] = useState({
		name: "",
		role: "",
		server: "",
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
			<ProtectedRoute tag="teacher" state={state} subProps={{}} />
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
			{/* <ProtectedRoute tag="teacher" state={state} subProps={{}} /> */}
			<ProtectedRoute tag="student" state={state} subProps={{}} />
		</Router>
	);
};

export default App;
