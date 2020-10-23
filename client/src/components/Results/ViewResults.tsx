import React from "react";
import TimeLeft from "./TimeLeft";
import { connect } from "react-redux";
import state from "../InterfaceDefaults/StateProps";
import { resetQuestion } from "../../redux/actions";

interface ResultProps {
	socket: any;
	timeLeft: Number;
	reset: Function;
}

const ViewResults: React.FC<ResultProps> = ({ socket, timeLeft, reset }) => {
	return (
		<div>
			<TimeLeft socket={socket} />
			{timeLeft !== 0 ? <h3>Waiting for results...</h3> : null}
			<button
				className="default"
				onClick={() => reset()}
				disabled={timeLeft !== 0}
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
	(dispatch) => {
		return {
			reset: () => dispatch(resetQuestion()),
		};
	}
)(ViewResults);
