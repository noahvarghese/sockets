import React, { useState } from "react";
import Questions from "../../config/Questions";
import { setStateFromElementChange } from "../../Util/Functions";
import CreateQuestion from "./CreateQuestion";

const SelectQuestion = () => {
	const [state, setState] = useState({
		questionType: "Select a question type",
		time: null,
		score: null,
		answers: {},
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

			{state.questionType !== "Select a question type" ? (
				<CreateQuestion tag={state.questionType} />
			) : null}

			<button disabled>Send to Students</button>
		</>
	);
};

export default SelectQuestion;
