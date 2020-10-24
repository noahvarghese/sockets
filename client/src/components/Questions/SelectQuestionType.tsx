import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../../assets/css/selectQuestion.css";
import { setQuestionSubmitted } from "../../redux/actions";
import ViewResults from "../Results/ViewTeacherResults";
import state, { question } from "../InterfaceDefaults/StateProps";
import QuestionInfo from "./QuestionInfo";

const checkDataFilled = (question: question, submitted): boolean => {
	let empty: boolean = false;

	if (
		question.info.type === "" ||
		Number(question.info.score) < 1 ||
		Number(question.info.time) < 1
	) {
		empty = true;
	}

	if (question.info.type === "Multiple Choice") {
		if (question.multipleChoice.question.trim() === "") {
			empty = true;
		}

		if (question.multipleChoice.answers.length <= 1) {
			empty = true;
		}

		question.multipleChoice.answers.forEach((answer, index) => {
			if (answer.text.trim() === "") {
				empty = true;
			}
		});
	} else if (question.info.type === "Matching Pairs") {
		if (question.matching.properties.length <= 1) {
			empty = true;
		}
		if (question.matching.properties.length !== question.matching.vals.length) {
			empty = true;
		}
		question.matching.properties.forEach((property, index) => {
			if (
				property.trim() === "" ||
				question.matching.vals[index].trim() === ""
			) {
				empty = true;
			}
		});
	}

	return !empty;
};

interface SelectQuestionProps {
	socket: any;
	question: question;
	readOnly?: boolean;
	setSubmit: Function;
}

const SelectQuestion: React.FC<SelectQuestionProps> = ({
	socket,
	question,
	readOnly,
	setSubmit,
	...props
}) => {
	const [state, setState] = useState({
		enableSubmit: false,
	});
	const submitted = question.submitted;

	useEffect(() => {
		if (!submitted) {
			const dataFilled: boolean = checkDataFilled(question, submitted);

			if (state.enableSubmit !== dataFilled) {
				setState({
					enableSubmit: dataFilled,
				});
			}
		}
	});

	if (submitted) {
		return <ViewResults socket={socket} />;
	}

	return (
		<>
			<h2>Post a question to students</h2>
			<QuestionInfo />

			<button
				className="default"
				disabled={!state.enableSubmit}
				onClick={() => {
					const data = [question];

					socket.emit("createQuestion", data);
					setSubmit(true);
				}}
			>
				Send to Students
			</button>
		</>
	);
};

export default connect(
	(state: state) => ({
		question: state.question,
	}),
	(dispatch) => {
		return {
			setSubmit: (submitted: boolean) =>
				dispatch(setQuestionSubmitted(submitted)),
		};
	}
)(SelectQuestion);
