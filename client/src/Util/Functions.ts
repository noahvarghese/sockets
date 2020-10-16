export const isEmpty = (jsonObject: Object): Boolean => {
	let empty = false;

	for (const key in jsonObject) {
		if (
			jsonObject[key] === "" ||
			jsonObject[key] === null ||
			typeof jsonObject[key] === "undefined"
		) {
			empty = true;
			break;
		}
	}
	return empty;
};

export const setStateFromInputChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	setState: Function,
	state: Object
) => {
	setState({
		...state,
		[e.target.name]: e.target.value,
	});
};
