import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Role from "./pages/Role";
import ProtectedRoute from "./components/ProtectedRoute";
import "./assets/css/root.css";

const Main = ({ role, name, server, ...props }) => {
	return (
		<>
			<Router>
				<div className="root">
					{!name || !server || !role ? (
						<>
							<h1>Welcome</h1>
							<hr />
						</>
					) : null}
					<Route path="/" exact render={() => <Role />} />
					<ProtectedRoute tag="screenName" />
					<ProtectedRoute tag="serverID" />
				</div>
				<div className="home">
					<ProtectedRoute tag="home" />
				</div>
			</Router>
			<div className="background"></div>
		</>
	);
};

export default connect(
	(state) => state.info,
	(dispatch) => bindActionCreators({}, dispatch)
)(Main);
