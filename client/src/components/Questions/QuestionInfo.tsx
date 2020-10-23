import React from "react";
import { connect } from "react-redux";
import {
	resetQuestion,
	setQuestionScore,
	setQuestionTime,
	setQuestionType,
} from "../../redux/actions";
import state, { questionInfo } from "../InterfaceDefaults/StateProps";
import Questions from "../../config/Questions";
import CreateMultipleChoice from "./MultipleChoice/CreateMultipleChoice";
import CreateMatching from "./MatchingPairs/CreateMatching";

interface QuestionInfoProps {
	info?: questionInfo;
	dispatch?: any;
	reset: Function;
	setType: Function;
	setTime: Function;
	setScore: Function;
}

const QuestionInfo: React.FC<QuestionInfoProps> = (
	{ info, reset, setTime, setType, setScore },
	props
) => {
	const { time, type, score } = info!;
	return (
		<>
			<div className="selectQuestion">
				<select
					name="questionType"
					onChange={(e) => {
						setType(e.target.value);
					}}
					value={type as string}
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
					onChange={(e) => setScore(Number(e.target.value))}
					value={Number(score) ? String(score) : ""}
				/>
				<input
					type="number"
					name="time"
					placeholder="Time (s)"
					aria-label="Time"
					value={Number(time) ? String(time) : ""}
					onChange={(e) => {
						setTime(Number(e.target.value));
					}}
				/>
			</div>
			{type === "Multiple Choice" ? (
				<CreateMultipleChoice />
			) : type === "Matching Pairs" ? (
				<CreateMatching />
			) : null}
		</>
	);
};

export default connect(
	(state: state) => {
		return {
			info: state.question.info,
		};
	},
	(dispatch) => {
		return {
			reset: () => {
				dispatch(resetQuestion());
			},
			setType: (type) => {
				dispatch(setQuestionType(type));
			},
			setTime: (time) => {
				dispatch(setQuestionTime(time));
			},
			setScore: (score) => {
				dispatch(setQuestionScore(score));
			},
		};
	}
)(QuestionInfo);
