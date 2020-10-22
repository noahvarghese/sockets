import React, { useEffect, useState } from "react";
import "../assets/css/timeLeft.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateTimeLeft } from "../redux/actions";
import state from "./StateProps";

interface TimeProps {
	socket: any;
	timeLeft?: Object | undefined;
	updateTimeLeft?: Function;
}

const TimeLeft: React.FC<TimeProps> = ({
	socket,
	updateTimeLeft,
	...timeLeft
}) => {
	// const [time, setTime] = useState(0);
	useEffect(() => {
		socket.on("timeLeft", (time) => {
			console.log(time);
			// for some reason it is comparing it to the original state???
			// had to include special case for 0
			if (time !== timeLeft.timeLeft || time === 0) {
				updateTimeLeft!(time);
			}
		});
	});
	return (
		<div className="timeLeft">
			{timeLeft.timeLeft! > -1 ? timeLeft.timeLeft : null}
		</div>
	);
};

export default connect(
	(state: state) => {
		return { timeLeft: state.timeLeft };
	},
	(dispatch) =>
		bindActionCreators(
			{
				updateTimeLeft: updateTimeLeft,
			},
			dispatch
		)
)(TimeLeft);
