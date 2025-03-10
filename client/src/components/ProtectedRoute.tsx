import React from "react";
import { Redirect, Route } from "react-router-dom";
import Routes from "../config/Routes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import state from "./InterfaceDefaults/StateProps";

interface ProtectedRouteProps {
	tag: String;
	info: {
		role: String;
		server: String;
		name: String;
	};
	subProps: Object | null;
}

const validate = (required, state) => {
	let valid = true;
	for (let i in required) {
		if (state[required[i]].trim() === "") {
			valid = false;
			break;
		}
	}
	return valid;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	tag,
	info,
	subProps,
	...props
}) => {
	const { required, path, Component } = Routes[tag as string];
	const valid = validate(required, info);

	return valid ? (
		<Route render={() => <Component {...subProps} />} exact path={path} />
	) : (
		<Redirect to="/" />
	);
};

export default connect(
	(state: state) => ({ info: state.info }),
	(dispatch) => bindActionCreators({}, dispatch)
)(ProtectedRoute);
