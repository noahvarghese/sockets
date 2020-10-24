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

export const iterateCheckEquivalent = (firstObject, secondObject) => {
    let equivalent = true;

    if (Object.keys(firstObject).length === Object.keys(secondObject).length) {
        for (let prop in firstObject) {
            // check both objects have the same property
            if (firstObject.hasOwnProperty(prop) && secondObject.hasOwnProperty(prop)) {
                if (typeof firstObject[prop] === typeof secondObject[prop]) {
                    const type = typeof firstObject[prop];

                    // this works for arrays as well
                    if (type === "object") {
                        equivalent = iterateCheckEquivalent(firstObject[prop], secondObject[prop]);
                    } else {
                        if (firstObject[prop] !== secondObject[prop]) {
                            equivalent = false;
                        }
                    }
                }
            }
        }
    }

    return equivalent;
};