import React, { useState } from "react";

interface MCAnswerProps {
	text?: String;
	correct?: Boolean;
	index: Number;
	setMultipleChoice: Function;
}

const MultipleChoiceAnswer: React.FC<MCAnswerProps> = ({
	correct,
	text,
	index,
	setMultipleChoice,
	...props
}) => {
	const [state, setState] = useState({
		correct: correct || false,
		text: text || "",
	});

	return (
		<div>
			<input
				type="checkbox"
				name="correct"
				aria-label="Correct"
				checked={state.correct as boolean}
				onChange={() => {
					setState({ ...state, correct: !state.correct });
					setMultipleChoice(
						{ correct: !state.correct, answer: state.text },
						index
					);
				}}
			/>
			<span className="checkmark"></span>
			<input
				type="text"
				name="answer"
				aria-label="Answer"
				placeholder="Answer"
				value={state.text as string}
				onChange={(e) => {
					setState({ ...state, text: e.target.value.trim() });
					setMultipleChoice(
						{ correct: state.correct, answer: e.target.value },
						index
					);
				}}
			/>
		</div>
	);
};

export default MultipleChoiceAnswer;
