import React, { useState } from "react";
import { setStateFromElementChange } from "../../../Util/Functions";

const MultipleChoiceQuestion = ({ setQuestion }) => {
	const [state, setState] = useState({ question: "" });
	return (
		<div>
			<h3>Question</h3>
			<textarea
				name="question"
				placeholder="What is the question?"
				aria-label="Question"
				rows={5}
				cols={50}
				onChange={(e) => {
					setState({
						question: e.target.value,
					});
					setQuestion(e.target.value);
				}}
			></textarea>
		</div>
	);
};

export default MultipleChoiceQuestion;
