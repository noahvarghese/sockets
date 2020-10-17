import React from "react";
import CreateQuestion from "../components/Questions/CreateQuestion";

const Teacher = (setGlobalState: Function, ...props) => {
	return (
		<div>
			<h1>Teacher</h1>
			<CreateQuestion />
		</div>
	);
};

export default Teacher;
