import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import socketIOClient from "socket.io-client";
import SelectQuestionType from "../components/Questions/SelectQuestionType";
// import state from "../components/StateProps";

const ENDPOINT = "http://localhost:4000";

const Home = ({ info, multipleChoice, matching, ...props }) => {
	const [response, setResponse] = useState("");
	const socket = socketIOClient(ENDPOINT);

	socket.on("connect", () => {
		console.log("in room");
		socket.emit("room", info.server);
	});

	socket.on("message", (data) => {
		console.log(data);
	});

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on("FromAPI", (data) => {
			setResponse(data);
		});
	}, []);
	return (
		<>
			<h1>{info.role.toUpperCase()}</h1>
			<hr />
			{info.role === "Teacher" ? <SelectQuestionType /> : null}
			<span>{response}</span>
		</>
	);
};

export default connect(
	(state) => state,
	(_) => bindActionCreators({}, _)
)(Home);
