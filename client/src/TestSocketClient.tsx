import React, { useState, useEffect } from "react";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000/socket-io";

const TestSocketClient = () => {
	const [response, setResponse] = useState("");
	const socket = socketIOClient(ENDPOINT);
	socket.on("connection", (data) => {
		console.log("Connected");
	});

	socket.on("FromAPI", (data) => {
		console.log(data);
		setResponse(data);
	});

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on("connection", (data) => {
			console.log("Connected");
		});

		socket.on("FromAPI", (data) => {
			console.log(data);
			setResponse(data);
		});
	}, []);

	return (
		<p>
			It's <time dateTime={response}>{response}</time>
		</p>
	);
};

export default TestSocketClient;
