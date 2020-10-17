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

export const setStateFromElementChange = (
	e: React.ChangeEvent,
	setState: Function,
	state: Object,
	name?: String
) => {
	let event: React.ChangeEvent<
		HTMLInputElement | HTMLSelectElement
	> | null = null;

	if (e.nativeEvent.type === "input") {
		event = e as React.ChangeEvent<HTMLInputElement>;
	} else if (e.nativeEvent.type === "change") {
		event = e as React.ChangeEvent<HTMLSelectElement>;
	}

	setState({
		...state,
		[event?.target.name!]: event?.target.value,
	});
	console.log(state);
};
