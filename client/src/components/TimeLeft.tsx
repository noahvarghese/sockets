import React, { useEffect, useState } from "react";
import "../assets/css/timeLeft.css";

const TimeLeft = ({ socket }) => {
	const [time, setTime] = useState(0);
	useEffect(() => {
		socket.on("timeLeft", (timeLeft) => {
			console.log(timeLeft);
			// for some reason it is comparing it to the original state???
			// had to include special case for 0
			if (timeLeft !== time || timeLeft === 0) {
				setTime(timeLeft);
			}
		});
	}, []);
	return <div className="timeLeft">{time}</div>;
};

export default TimeLeft;
