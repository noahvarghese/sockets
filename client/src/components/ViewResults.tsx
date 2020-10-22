import React, { useState } from "react";
import TimeLeft from "./TimeLeft";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import state from "./StateProps";

interface ResultProps {
	socket: any;
	createNewQuestion: Function;
	blankQuestion: Object;
	timeLeft?: Object;
}

const ViewResults: React.FC<ResultProps> = ({
	socket,
	createNewQuestion,
	blankQuestion,
	...timeLeft
}) => {
	return (
		<div>
			<TimeLeft socket={socket} />
			{timeLeft.timeLeft !== 0 ? <h3>Waiting for results...</h3> : null}
			<button
				className="default"
				onClick={() => createNewQuestion(blankQuestion)}
				disabled={timeLeft.timeLeft !== 0}
			>
				Next Question
			</button>
		</div>
	);
};

export default connect(
	(state: state) => {
		return { timeLeft: state.timeLeft };
	},
	(_) => bindActionCreators({}, _)
)(ViewResults);
