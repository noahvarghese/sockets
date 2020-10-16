import ScreenName from "./pages/ScreenName";
import ServerID from "./pages/ServerID";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";

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
	teacher: {
		Component: Teacher,
		path: "/teacher",
		required: ["role", "name", "server"],
	},
	student: {
		Component: Student,
		path: "/student",
		required: ["role", "name", "server"],
	},
};

export default Routes;
