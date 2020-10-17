import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Role from "./pages/Role";
import ProtectedRoute from "./components/ProtectedRoute";

const Main = ({ role, name, server, ...props }) => {
	return (
		<Router>
			{!name || !server || !role ? <h1>Welcome</h1> : null}
			<Route path="/" exact render={() => <Role />} />
			<ProtectedRoute tag="screenName" />
			<ProtectedRoute tag="serverID" />
			<ProtectedRoute tag="teacher" />
			<ProtectedRoute tag="student" />
		</Router>
	);
};

export default connect(
	(state) => state.info,
	(dispatch) => bindActionCreators({}, dispatch)
)(Main);
