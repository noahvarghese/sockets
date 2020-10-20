export const isEmpty = (value) => {
    if (value === null || value === "" || typeof value === "undefined" || value === false) {
        return true;
    }

    return false;
}

export const isValidResponse = (value) => {

    if (value === 1 || value === "OK" || value === true || value === true) {
        return true;
    }

    return false;
};