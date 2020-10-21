import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectQuestionType from "../components/Questions/SelectQuestionType";
import { isEmpty } from "../Util/Functions";
// import state from "../components/StateProps";

const Home = ({ info, multipleChoice, matching, socket, ...props }) => {
	const [response, setResponse] = useState<String | Object>("");
	// socket.on("sendMessage", (data) => {
	// 	console.log(data);
	// 	setResponse(data);
	// });

	useEffect(() => {
		socket.on("sendQuestion", (data) => {
			console.log(data[0].message);
			setResponse({ question: data[0].message });
		});
	});
	return (
		<>
			<h1>{info.role.toUpperCase()}</h1>
			<hr />
			{info.role === "Teacher" ? <SelectQuestionType socket={socket} /> : null}
			<span>
				{response ? (
					JSON.stringify(response)
				) : info.role === "Teacher" ? null : (
					<h3>Waiting for question...</h3>
				)}
			</span>
		</>
	);
};

export default connect(
	(state) => state,
	(_) => bindActionCreators({}, _)
)(Home);
