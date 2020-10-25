import React from "react";
import { connect } from "react-redux";
import { setMultipleChoiceAnswer } from "../../../redux/actions";
import state, { mc } from "../../InterfaceDefaults/StateProps";
import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

interface CreateMultipleChoiceProps {
	multipleChoice: mc;
	setAnswer: Function;
}

const CreateMultipleChoice: React.FC<CreateMultipleChoiceProps> = ({
	multipleChoice,
	setAnswer,
}) => {
	return (
		<div>
			<MultipleChoiceQuestion />
			<h3>Answers</h3>
			{multipleChoice.answers.map((answer, index) => (
				<MultipleChoiceAnswer key={index} {...answer} index={index} />
			))}
			<div className="btnContainer">
				<button
					className="default"
					onClick={() => {
						let newState = [
							...multipleChoice.answers,
							{ text: "", correct: false },
						];
						setAnswer(newState);
					}}
				>
					Add
				</button>
				{multipleChoice.answers.length > 1 ? (
					<button
						className="secondary"
						onClick={() => {
							let newState = multipleChoice.answers.slice(
								0,
								multipleChoice.answers.length - 1
							);
							setAnswer!(newState);
						}}
					>
						Delete
					</button>
				) : null}
			</div>
		</div>
	);
};

export default connect(
	(state: state) => ({ multipleChoice: state.question.multipleChoice }),
	(dispatch) => {
		return {
			setAnswer: (answer) => dispatch(setMultipleChoiceAnswer(answer)),
		};
	}
)(CreateMultipleChoice);
