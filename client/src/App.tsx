import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import Role from "./pages/Role";
import ScreenName from "./pages/ScreenName";
import ServerID from "./pages/ServerID";

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
			<Switch>
				<Route
					path="/"
					exact
					render={() => <Role setGlobalState={transferStateOnClick} />}
				/>
				<Route
					path="/screenName"
					exact
					render={() => <ScreenName setGlobalState={transferStateOnClick} />}
				/>
				<Route
					path="/serverID"
					exact
					render={() => (
						<ServerID setGlobalState={transferStateOnClick} role={state.role} />
					)}
				/>
				<Route path="/teacher" exact render={() => <Teacher />} />
				<Route path="/student" exact render={() => <Student />} />
			</Switch>
		</Router>
	);
};

export default App;
