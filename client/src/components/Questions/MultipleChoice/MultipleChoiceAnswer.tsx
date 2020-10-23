import React from "react";
import { connect } from "react-redux";
import {
	setMultipleChoiceAnswerCorrect,
	setMultipleChoiceAnswerText,
} from "../../../redux/actions";
import state, { mcAnswer } from "../../InterfaceDefaults/StateProps";

interface MCAnswerProps {
	answers?: mcAnswer[];
	index: Number;
	setAnswerText: Function;
	setAnswerCorrect: Function;
}

const MultipleChoiceAnswer: React.FC<MCAnswerProps> = ({
	answers,
	index,
	setAnswerText,
	setAnswerCorrect,
	...props
}) => {
	const answer = answers![index as number];
	return (
		<div>
			<input
				type="checkbox"
				name="correct"
				aria-label="Correct"
				checked={answer.correct as boolean}
				onChange={(e) => {
					setAnswerCorrect(e.target.checked, index);
				}}
			/>
			<input
				type="text"
				name="answer"
				aria-label="Answer"
				placeholder="Answer"
				value={answer.text as string}
				onChange={(e) => {
					setAnswerText(e.target.value, index);
				}}
			/>
		</div>
	);
};

export default connect(
	(state: state) => ({ answers: state.question.multipleChoice.answers }),
	(dispatch) => {
		return {
			setAnswerText: (text: string, index: number) =>
				dispatch(setMultipleChoiceAnswerText(text, index)),
			setAnswerCorrect: (correct: boolean, index: number) =>
				dispatch(setMultipleChoiceAnswerCorrect(correct, index)),
		};
	}
)(MultipleChoiceAnswer);
