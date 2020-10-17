import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Main from "./Main";
import reducer from "./redux/reducer";

const store = createStore(reducer);

const App = () => (
	<Provider store={store}>
		<Main />
	</Provider>
);

export default App;
