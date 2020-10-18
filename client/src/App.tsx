import React from "react";
import { useState, useEffect } from "react";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import Main from "./Main";
// import reducer from "./redux/reducer";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000/";

// const store = createStore(reducer);

const App = () => {
	// <Provider store={store}>
	// 	<Main />
	// </Provider>
	const [response, setResponse] = useState("");
	// const socket = socketIOClient(ENDPOINT);
	// // socket.on("FromAPI", (data) => {
	// // 	setResponse(data);
	// // });

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);

		socket.on("FromAPI", (data) => {
			setResponse(data);
		});
	}, []);
	return <div>{response}</div>;
};

export default App;
