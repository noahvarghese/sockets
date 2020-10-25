import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Role from "./pages/Role";
import ProtectedRoute from "./components/ProtectedRoute";
import "./assets/css/root.css";
import { socket } from "./config/Socket";
import state from "./components/InterfaceDefaults/StateProps";

// This function shares the socket object with the rest of the components

const Main = ({ role, name, server, ...props }) => {
	return (
		<>
			<Router>
				<div className="root">
					<Route path="/" exact render={() => <Role />} />
					<ProtectedRoute tag="screenName" subProps={{ socket: socket }} />
					<ProtectedRoute tag="serverID" subProps={{ socket: socket }} />
				</div>
				<div className="home">
					<ProtectedRoute tag="home" subProps={{ socket: socket }} />
				</div>
			</Router>
			<div className="background"></div>
		</>
	);
};

export default connect(
	(state: state) => state.info,
	(dispatch) => bindActionCreators({}, dispatch)
)(Main);
