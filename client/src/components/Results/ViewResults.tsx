import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import state from "../InterfaceDefaults/StateProps";
import { resetQuestion } from "../../redux/actions";
import "../../assets/css/results.css";

interface ResultProps {
	socket: any;
	timeLeft: Number;
	role: String;
	reset: Function;
}

export const compare = (first, second) => {
	if (first.score < second.score) {
		return 1;
	}

	if (first.score > second.score) {
		return -1;
	}

	return 0;
};

const ViewResults: React.FC<ResultProps> = ({
	socket,
	timeLeft,
	role,
	reset,
}) => {
	const [students, setStudents] = useState([
		{
			name: "",
			score: 0,
		},
	]);

	useEffect(() => {
		socket.on("sendResponse", (scores: { name: string; score: number }[]) => {
			console.log(scores);
			setStudents(scores.sort(compare));
		});
	});

	return (
		<div>
			{students.length >= 1 && students[0].name !== "" ? (
				<>
					<h2>Results</h2>
					<div className="results">
						<div className="resultContainer">
							<h4 className="header">Name</h4>
							<h4 className="header">Score</h4>
						</div>
						{students.map(({ name, score }, index) => {
							if (name !== "") {
								return (
									<div className="resultContainer" key={index}>
										<h4>{name}</h4>
										<h4>{score}</h4>
									</div>
								);
							}
						})}
					</div>
				</>
			) : null}

			{timeLeft !== 0 && role === "Teacher" ? (
				<h3>Waiting for results...</h3>
			) : null}
			{role === "Teacher" ? (
				<button
					className="default"
					onClick={() => reset()}
					disabled={timeLeft !== 0}
				>
					Next Question
				</button>
			) : null}
		</div>
	);
};

export default connect(
	(state: state) => {
		return { timeLeft: state.timeLeft, role: state.info.role };
	},
	(dispatch) => {
		return {
			reset: () => dispatch(resetQuestion()),
		};
	}
)(ViewResults);
