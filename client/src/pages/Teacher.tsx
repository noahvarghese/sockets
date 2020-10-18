import React from "react";
import SelectQuestionType from "../components/Questions/SelectQuestionType";

const Teacher = (setGlobalState: Function, ...props) => {
	return (
		<div>
			<h1>Teacher</h1>
			<hr />
			<SelectQuestionType />
		</div>
	);
};

export default Teacher;
