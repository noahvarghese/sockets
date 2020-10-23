import React, { useEffect } from "react";
import "../../assets/css/timeLeft.css";
import { connect } from "react-redux";
import { setTimeLeft } from "../../redux/actions";
import state from "../InterfaceDefaults/StateProps";

interface TimeProps {
	socket: any;
	timeLeft?: Object | undefined;
	setTimeLeft?: Function;
}

const TimeLeft: React.FC<TimeProps> = ({
	socket,
	setTimeLeft,
	...timeLeft
}) => {
	// const [time, setTime] = useState(0);
	useEffect(() => {
		socket.on("timeLeft", (time) => {
			console.log(time);
			// for some reason it is comparing it to the original state???
			// had to include special case for 0
			if (time !== timeLeft.timeLeft || time === 0) {
				setTimeLeft!(time);
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
	(dispatch) => {
		return {
			setTimeLeft: (timeLeft) => dispatch(setTimeLeft(timeLeft)),
		};
	}
)(TimeLeft);
