import React from "react";
import { compose, createStore } from "redux";
import { Provider } from "react-redux";
import Main from "./Main";
import reducer from "./redux/reducer";

const store = createStore(
	reducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
	<Provider store={store}>
		<Main />
	</Provider>
);

export default App;
