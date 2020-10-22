import React, { useEffect, useState } from "react";
import TimeLeft from "./TimeLeft";

const ViewResults = ({ socket, createNewQuestion }) => {
	const [state, setState] = useState({
		timeLeft: 0,
	});

	// useEffect(() => {
	// 	socket.on("timeLeft", (timeLeft) => {
	// 		setState({ timeLeft: timeLeft });
	// 	});
	// }, []);
	return (
		<div>
			{/* <TimeLeft  /> */}
			{state.timeLeft === 0 ? (
				<button onClick={createNewQuestion()}>Next Question</button>
			) : null}
		</div>
	);
};

export default ViewResults;
