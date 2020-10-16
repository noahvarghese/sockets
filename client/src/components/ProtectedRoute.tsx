import React from "react";
import { Redirect, Route } from "react-router-dom";
import Routes from "../Routes";

interface ProtectedRouteProps {
	tag: String;
	state: {
		role: String;
		name: String;
		server: String;
	};
	subProps: Object;
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

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
	const { tag, state, subProps } = props;
	const { required, path, Component } = Routes[tag as string];
	const valid = validate(required, state);
	// console.log(tag, path, subProps);

	return valid ? (
		<Route render={() => <Component {...subProps} />} exact path={path} />
	) : (
		<Redirect to="/" />
	);
};

export default ProtectedRoute;
