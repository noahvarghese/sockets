export const isEmpty = (jsonObject: Object): Boolean => {
	let empty = false;

	for (const key in jsonObject) {
		if (
			jsonObject[key].trim() === "" ||
			jsonObject[key] === null ||
			typeof jsonObject[key] === "undefined"
		) {
			empty = true;
			break;
		}
	}
	return empty;
};
