import { ADD_NAME, ADD_ROLE, ADD_SERVER } from "./actionTypes";

export const setRole = (role) => ({
	type: ADD_ROLE,
	payload: role,
});

export const setName = (name) => ({
	type: ADD_NAME,
	payload: name,
});

export const setServer = (server) => ({
	type: ADD_SERVER,
	payload: server,
});
