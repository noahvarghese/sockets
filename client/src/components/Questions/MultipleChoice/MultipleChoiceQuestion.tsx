import React from "react";
import { connect } from "react-redux";
import { setMultipleChoiceQuestion } from "../../../redux/actions";
import state from "../../InterfaceDefaults/StateProps";

interface MCQuestionProps {
	question?: String;
	setQuestion: Function;
}

const MultipleChoiceQuestion: React.FC<MCQuestionProps> = ({
	question,
	setQuestion,
}) => {
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
				value={question as string}
				onChange={(e) => {
					setQuestion(e.target.value);
				}}
			></textarea>
		</div>
	);
};

export default connect(
	(state: state) => ({ question: state.question.multipleChoice.question }),
	(dispatch) => {
		return {
			setQuestion: (question) => dispatch(setMultipleChoiceQuestion(question)),
		};
	}
)(MultipleChoiceQuestion);
