import React, { useState } from "react";

interface MCAnswerProps {
	text?: String;
	correct?: Boolean;
}

const MultipleChoiceAnswer: React.FC<MCAnswerProps> = ({
	correct,
	text,
	...props
}) => {
	const [state, setState] = useState({
		correct: correct || false,
		text: text || "",
	});

	return (
		<>
			<input
				type="checkbox"
				name="correct"
				aria-label="Correct"
				checked={state.correct as boolean}
				onChange={() => setState({ ...state, correct: !state.correct })}
			/>
			<input
				type="text"
				name="answer"
				aria-label="Answer"
				placeholder="Answer"
				value={state.text as string}
				onChange={(e) => setState({ ...state, text: e.target.value.trim() })}
			/>
		</>
	);
};

export default MultipleChoiceAnswer;
