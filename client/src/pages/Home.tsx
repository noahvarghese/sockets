import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectQuestionType from "../components/Questions/SelectQuestionType";
import { addQuestion } from "../redux/actions";
// import state from "../components/StateProps";

const Home = ({ info, question, socket, ...props }) => {
	const [response, setResponse] = useState<String | Object>("");

	useEffect(() => {
		socket.on("sendQuestion", (data) => {
			console.log(data[0].question);
			addQuestion(data[0].question);
			setResponse({ question: data[0] });
		});
	});
	return (
		<>
			<h1>{info.role.toUpperCase()}</h1>
			<hr />
			{info.role === "Teacher" ? <SelectQuestionType socket={socket} /> : null}
			<span>
				{response ? (
					JSON.stringify(question)
				) : info.role === "Teacher" ? null : (
					<h3>Waiting for question...</h3>
				)}
			</span>
		</>
	);
};

export default connect(
	(state) => state,
	(dispatch) => bindActionCreators({ addQuestion: addQuestion }, dispatch)
)(Home);
