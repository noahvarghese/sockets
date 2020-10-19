import Home from "../pages/Home";
import ScreenName from "../pages/ScreenName";
import ServerID from "../pages/ServerID";

const Routes = {
	screenName: {
		Component: ScreenName,
		path: "/screenName",
		required: ["role"],
	},
	serverID: {
		Component: ServerID,
		path: "/serverID",
		required: ["role", "name"],
	},
	home: {
		Component: Home,
		path: "/home",
		required: ["role", "name", "server"],
	},
};

export default Routes;
