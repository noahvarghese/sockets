import React, { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoice/MultipleChoiceQuestion";
import MultipleChoiceAnswer from "./MultipleChoice/MultipleChoiceAnswer";
import MCAnswerProps from "./MultipleChoice/MCAnswerProps";
import MatchingProps from "./MatchingPairs/MatchingProps";
import MatchingLine from "./MatchingPairs/MatchingLine";

interface CreateQuestionProps {
	tag: String;
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({ tag, ...props }) => {
	const emptyMCAnswerProps: MCAnswerProps = { text: "", correct: false };
	const emptyMatchingProps: MatchingProps = {
		matching: { property: "", value: "" },
	};

	let emptyAnswerProps: MCAnswerProps | MatchingProps = {};
	let LineComponenent: any;

	if (tag === "Multiple Choice") {
		emptyAnswerProps = emptyMCAnswerProps;
		LineComponenent = MultipleChoiceAnswer;
	} else if (tag === "Matching Pairs") {
		emptyAnswerProps = emptyMatchingProps;
		LineComponenent = MatchingLine;
	}

	const [state, setState] = useState({
		answers: [emptyAnswerProps],
	});

	return (
		<>
			{tag === "Multiple Choice" ? (
				<>
					<MultipleChoiceQuestion />
					<h3>Answers</h3>
				</>
			) : null}
			{state.answers.length === 0 ? (
				<LineComponenent />
			) : (
				state.answers.map((answer, index) => (
					<LineComponenent key={index} {...answer} index={index} />
				))
			)}
			<div className="btnContainer">
				<button
					className="default"
					onClick={() => {
						setState({
							...state,
							// Don't use push as the state is immutable
							// concat combines the array calling it and the array passed into the method
							answers: state.answers.concat([emptyAnswerProps]),
						});
					}}
				>
					Add
				</button>
				{state.answers.length > 1 ? (
					<button
						className="secondary"
						onClick={() => {
							let answersCopy: Array<MCAnswerProps | MatchingProps> = [];
							for (let i = 0; i < state.answers.length; i++) {
								if (i !== state.answers.length - 1) {
									answersCopy.push(state.answers[i]);
								} else break;
							}

							setState({
								...state,
								answers: answersCopy,
							});
						}}
					>
						Delete
					</button>
				) : null}
			</div>
		</>
	);
};

export default CreateQuestion;
