import React, { useState } from "react";
import Questions from "../../config/Questions";
import { setStateFromElementChange } from "../../Util/Functions";
import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

interface AnswerProps {
	text: String;
	correct: Boolean;
}

const CreateQuestion = () => {
	const emptyAnswerProps: AnswerProps = { text: "", correct: false };

	const [state, setState] = useState({
		questionType: "Select a question type",
		time: null,
		score: null,
		answers: [emptyAnswerProps],
	});

	return (
		<>
			<h2>Post a question to students</h2>
			<select
				name="questionType"
				onChange={(e) => setStateFromElementChange(e, setState, state)}
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
			{state.questionType === "Multiple Choice" ? (
				<>
					<MultipleChoiceQuestion />
					<h3>Answers</h3>
					{state.answers.length === 0 ? (
						<MultipleChoiceAnswer />
					) : (
						state.answers.map((answer, index) => (
							<MultipleChoiceAnswer
								key={index}
								correct={answer.correct}
								text={answer.text}
							/>
						))
					)}
					<button
						onClick={() => {
							setState({
								...state,
								// Don't use push as the state is immutable
								// concat combines the array calling it and the array passed into the method
								answers: state.answers.concat([{ text: "", correct: false }]),
							});
						}}
					>
						Add
					</button>
					{state.answers.length > 1 ? (
						<button
							onClick={() => {
								let answersCopy: Array<AnswerProps> = [];
								console.log(state.answers.length);
								for (let i = 0; i < state.answers.length; i++) {
									if (i !== state.answers.length - 1) {
										console.log(i);
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
				</>
			) : null}
			<button disabled>Send to Students</button>
		</>
	);
};

export default CreateQuestion;
