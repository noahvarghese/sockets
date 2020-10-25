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
                        // only run recursively if no incorrect answers have been found
                        // we are not awarding part marks currently
                        if (equivalent) {
                            equivalent = iterateCheckEquivalent(firstObject[prop], secondObject[prop]);
                        } else {
                            break;
                        }
                    } else {
                        if (firstObject[prop] !== secondObject[prop]) {
                            equivalent = false;
                            break;
                        }
                    }
                }
            }
        }
    }

    return equivalent;
};

export const shuffle = (oldArray) => {
    let array = oldArray.map(el => el);
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};