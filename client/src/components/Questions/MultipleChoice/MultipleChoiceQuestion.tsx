import React from "react";

const MultipleChoiceQuestion = () => {
	return (
		<div>
			<h3>Multiple Choice</h3>
			<textarea
				placeholder="What is the question?"
				aria-label="Question"
				rows={5}
				cols={50}
			></textarea>
		</div>
	);
};

export default MultipleChoiceQuestion;
