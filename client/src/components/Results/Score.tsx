import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setScore } from "../../redux/actions";
import state from "../InterfaceDefaults/StateProps";

const Score = ({ socket, score, setScore }) => {
	useEffect(() => {
		socket.on("setScore", (newScore) => {
			if (score !== newScore) {
				setScore(newScore);
			}
		});
	});
	return (
		<div className="timeLeft">
			<p>Score</p>
			{score}
		</div>
	);
};

export default connect(
	(state: state) => ({
		score: state.currentScore,
	}),
	(dispatch) => ({
		setScore: (score) => dispatch(setScore(score)),
	})
)(Score);
