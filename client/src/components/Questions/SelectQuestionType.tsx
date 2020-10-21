import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Questions from "../../config/Questions";
import { isEmpty, setStateFromElementChange } from "../../Util/Functions";
import CreateQuestion from "./CreateQuestion";
import "../../assets/css/selectQuestion.css";
import { setInfo } from "../../redux/actions";

const SelectQuestion = ({
	/*addMatching, addMultipleChoice,*/ info,
	question,
	socket,
	...props
}) => {
	const [state, setState] = useState({
		questionType: "Select a question type",
		time: null,
		score: null,
		answers: [{}],
		enableSubmit: false,
	});

	let answersAreEmpty = false;

	state.answers.forEach((answer) => {
		if (isEmpty(answer)) {
			answersAreEmpty = true;
			return;
		}
	});

	if (
		(answersAreEmpty === false && state.enableSubmit === false) ||
		(answersAreEmpty && state.enableSubmit)
	) {
		setState({
			...state,
			enableSubmit: !answersAreEmpty,
		});
	}

	return (
		<>
			<h2>Post a question to students</h2>
			<div className="selectQuestion">
				<select
					name="questionType"
					onChange={(e) => {
						setStateFromElementChange(e, setState, state);
					}}
					value={state.questionType}
				>
					<option>Select a question type</option>
					{Questions.map((question) => {
						return (
							<option value={question.type} key={question.type}>
								{question.type}
							</option>
						);
					})}
				</select>
				<input
					type="number"
					name="score"
					placeholder="Score"
					aria-label="Score"
					value={Number(state.score) ? (state.score! as string) : ""}
					onChange={(e) => setStateFromElementChange(e, setState, state)}
				/>
				<input
					type="number"
					name="time"
					placeholder="Time (s)"
					aria-label="Time"
					value={Number(state.time) ? (state.time! as string) : ""}
					onChange={(e) => setStateFromElementChange(e, setState, state)}
				/>
			</div>
			{state.questionType !== "Select a question type" ? (
				<div>
					<CreateQuestion tag={state.questionType} />
				</div>
			) : null}

			<button
				className="default"
				disabled={!state.enableSubmit}
				onClick={() => {
					const info = {
						type: state.questionType,
						score: state.score,
						time: state.time,
					};

					setInfo(info);

					const data = [
						{
							question: {
								info: info,
								matching: question.matching,
								multipleChoice: question.multipleChoice,
							},
						},
					];

					console.log(data);

					socket.emit("createQuestion", data);
				}}
			>
				Send to Students
			</button>
		</>
	);
};

export default connect(
	(state) => state,
	(dispatch) =>
		bindActionCreators(
			{
				setInfo: setInfo,
			},
			dispatch
		)
)(SelectQuestion);
