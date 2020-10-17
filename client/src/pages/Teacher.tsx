import React from "react";
import SelectQuestionType from "../components/Questions/SelectQuestionType";

const Teacher = (setGlobalState: Function, ...props) => {
	return (
		<div>
			<h1>Teacher</h1>
			<SelectQuestionType />
		</div>
	);
};

export default Teacher;
