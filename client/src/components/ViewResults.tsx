import React, { useState } from "react";
import TimeLeft from "./TimeLeft";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import state from "./StateProps";

interface ResultProps {
	socket: any;
	createNewQuestion: Function;
	blankQuestion: Object;
	timeLeft?: number;
}

const ViewResults: React.FC<ResultProps> = ({
	socket,
	createNewQuestion,
	blankQuestion,
	timeLeft,
}) => {
	return (
		<div>
			<TimeLeft socket={socket} />
			<button
				onClick={() => createNewQuestion(blankQuestion)}
				disabled={timeLeft === 0}
			>
				Next Question
			</button>
		</div>
	);
};

export default connect(
	(state: state) => state.timeLeft,
	(_) => bindActionCreators({}, _)
)(ViewResults);
