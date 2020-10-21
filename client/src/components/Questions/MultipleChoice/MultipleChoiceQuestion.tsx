import React, { useState } from "react";

const MultipleChoiceQuestion = ({ setQuestion, question }) => {
	const [state, setState] = useState({ question: question });
	return (
		<div>
			<h3>Question</h3>
			<textarea
				readOnly={question !== ""}
				name="question"
				placeholder="What is the question?"
				aria-label="Question"
				rows={5}
				cols={50}
				value={state.question}
				onChange={(e) => {
					setState({
						question: e.target.value,
					});
					if (setQuestion !== null) {
						setQuestion(e.target.value);
					}
				}}
			></textarea>
		</div>
	);
};

export default MultipleChoiceQuestion;
