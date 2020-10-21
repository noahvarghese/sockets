import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Questions from "../../config/Questions";
import "../../assets/css/selectQuestion.css";
import { setInfo } from "../../redux/actions";
import MultipleChoiceQuestion from "./MultipleChoice/MultipleChoiceQuestion";
// import MCAnswerProps from "./MultipleChoice/MCAnswerProps";
// import MatchingProps from "./MatchingPairs/MatchingProps";
import MultipleChoiceAnswer from "./MultipleChoice/MultipleChoiceAnswer";
import MatchingLine from "./MatchingPairs/MatchingLine";

const SelectQuestion = ({
	/*addMatching, addMultipleChoice,*/ info,
	question,
	socket,
	...props
}) => {
	const [state, setState] = useState({
		info: {
			time: "",
			score: "",
			type: "Select a question type",
		},
		matching: {
			properties: [""],
			vals: [""],
		},
		multipleChoice: {
			question: "",
			answers: [{ correct: false, answer: "" }],
		},
		enableSubmit: false,
	});

	const setQuestion = (question) => {
		setState({
			...state,
			multipleChoice: {
				question: question,
				answers: state.multipleChoice.answers,
			},
		});
	};

	const setMatching = (matching, index) => {
		const tempMatching = state.matching;
		tempMatching.properties[index] = matching.property;
		tempMatching.vals[index] = matching.val;

		setState({
			...state,
			matching: tempMatching,
		});
	};

	const setMultipleChoice = (mc, index) => {
		let tempAnswer = state.multipleChoice.answers;
		tempAnswer[index] = mc;
		setState({
			...state,
			multipleChoice: {
				question: state.multipleChoice.question,
				answers: tempAnswer,
			},
		});
	};
	let questionsAreEmpty: Boolean = false;
	let length = 0;

	let key = "";

	if (state.info.type === "Multiple Choice") {
		key = "multipleChoice";
		for (let i = 0; i < state.multipleChoice.answers.length; i++) {
			let answer = state.multipleChoice.answers[i].answer;
			if (answer === "") {
				questionsAreEmpty = true;
			}
		}
		if (state[key].question === "") {
			questionsAreEmpty = true;
		}
	} else if (state.info.type === "Matching Pairs") {
		key = "matching";

		for (let i = 0; i < state.matching.properties.length; i++) {
			const property = state.matching.properties[i];
			const val = state.matching.vals[i];
			if (property === "" || val === "") {
				questionsAreEmpty = true;
			}
		}
	} else {
		questionsAreEmpty = true;
	}

	let secondaryKey = "";

	let LineComponenent: any;

	if (key === "matching") {
		secondaryKey = "properties";
		LineComponenent = MatchingLine;
	} else if (key === "multipleChoice") {
		secondaryKey = "answers";
		LineComponenent = MultipleChoiceAnswer;
	}

	if (key !== "") {
		length = state[key][secondaryKey].length;
	}

	const enableSubmit =
		!questionsAreEmpty &&
		state.info.score !== "" &&
		state.info.time !== "" &&
		state.info.type !== "Select a question type";

	if (enableSubmit !== state.enableSubmit) {
		setState({
			...state,
			enableSubmit: enableSubmit as boolean,
		});
	}

	return (
		<>
			<h2>Post a question to students</h2>
			<div className="selectQuestion">
				<select
					name="questionType"
					onChange={(e) => {
						setState({
							info: {
								...state.info,
								type: e.target.value,
							},
							multipleChoice: {
								question: "",
								answers: [{ correct: false, answer: "" }],
							},
							matching: {
								properties: [""],
								vals: [""],
							},
							enableSubmit: false,
						});
					}}
					value={state.info.type}
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
					onChange={(e) =>
						setState({
							...state,
							info: {
								...state.info,
								score: e.target.value,
							},
						})
					}
					value={Number(state.info.score) ? (state.info.score! as string) : ""}
				/>
				<input
					type="number"
					name="time"
					placeholder="Time (s)"
					aria-label="Time"
					value={Number(state.info.time) ? (state.info.time! as string) : ""}
					onChange={(e) =>
						setState({
							...state,
							info: {
								...state.info,
								time: e.target.value,
							},
						})
					}
				/>
			</div>
			<>
				{state.info.type === "Multiple Choice" ? (
					<>
						<MultipleChoiceQuestion setQuestion={setQuestion} question="" />
						<h3>Answers</h3>
					</>
				) : null}
				{state.info.type !== "Select a question type" ? (
					length === 0 ? (
						<LineComponenent />
					) : state.info.type === "Multiple Choice" ? (
						state.multipleChoice.answers.map((answer, index) => (
							<LineComponenent
								key={index}
								{...answer}
								index={index}
								setMultipleChoice={setMultipleChoice}
							/>
						))
					) : (
						state.matching.properties.map((property, index) => (
							<LineComponenent
								key={index}
								property={property}
								val={state.matching.vals[index]}
								index={index}
								setMatching={setMatching}
							/>
						))
					)
				) : null}
				<div className="btnContainer">
					{state.info.type !== "Select a question type" ? (
						<button
							className="default"
							onClick={() => {
								let newState = {};
								if (state.info.type === "Matching Pairs") {
									if (secondaryKey === "") {
										secondaryKey = "properties";
									}
									newState = {
										properties: (state.matching.properties as String[]).concat([
											"",
										]),
										vals: (state.matching.vals as String[]).concat([""]),
									};
								} else if (state.info.type === "Multiple Choice") {
									if (secondaryKey === "") {
										secondaryKey = "answers";
									}
									newState = {
										question: state.multipleChoice.question,
										answers: (state.multipleChoice.answers as Object[]).concat([
											{
												correct: false,
												answer: "",
											},
										]),
									};
								}
								setState({
									...state,
									// Don't use push as the state is immutable
									// concat combines the array calling it and the array passed into the method
									[key]: newState,
								});
							}}
						>
							Add
						</button>
					) : null}
					{secondaryKey && state[key][secondaryKey].length > 1 ? (
						<button
							className="secondary"
							onClick={() => {
								let newState: any;
								if (state.info.type === "Matching Pairs") {
									newState = {
										properties: [],
										vals: [],
									};

									for (
										let i = 0;
										i < state.matching.properties.length - 1;
										i++
									) {
										newState.properties = (newState.properties as String[]).concat(
											[state.matching.properties[i]]
										);
										newState.vals = (newState.vals as String[]).concat([
											state.matching.vals[i],
										]);
									}
								} else if (state.info.type === "Multiple Choice") {
									newState = {
										question: state.multipleChoice.question,
										answers: [],
									};
									for (
										let i = 0;
										i < state.multipleChoice.answers.length - 1;
										i++
									) {
										newState.answers = (newState.answers as Object[]).concat([
											state.multipleChoice.answers[i],
										]);
									}
								}

								setState({
									...state,
									[key]: newState,
								});
							}}
						>
							Delete
						</button>
					) : null}
				</div>
			</>

			<button
				className="default"
				disabled={!state.enableSubmit}
				onClick={() => {
					const info = {
						type: state.info.type,
						score: state.info.score,
						time: state.info.time,
					};

					setInfo(info);

					const data = [
						{
							info: state.info,
							matching: state.matching,
							multipleChoice: state.multipleChoice,
						},
					];

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
