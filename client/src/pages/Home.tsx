import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectQuestionType from "../components/Questions/SelectQuestionType";
import { isEmpty } from "../Util/Functions";
// import state from "../components/StateProps";

const Home = ({ info, multipleChoice, matching, socket, ...props }) => {
	const [response, setResponse] = useState("");
	// socket.on("sendMessage", (data) => {
	// 	console.log(data);
	// 	setResponse(data);
	// });

	useEffect(() => {
		socket.on("sendMessage", (data) => {
			console.log(data);
			setResponse(data);
		});
	});
	return (
		<>
			<h1>{info.role.toUpperCase()}</h1>
			<hr />
			{info.role === "Teacher" ? <SelectQuestionType socket={socket} /> : null}
			<span>
				{!isEmpty(JSON.stringify(response)) ? JSON.stringify(response) : null}
			</span>
		</>
	);
};

export default connect(
	(state) => state,
	(_) => bindActionCreators({}, _)
)(Home);
