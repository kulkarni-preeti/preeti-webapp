export const isValidReq = (resObj) => {
    return Object.values(resObj).every(value => {
        return typeof value === 'string' && value.trim() !== '' && value !== null;
    });
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


export const isValidPostBody = (resObj) => {
    const requiredPostFields = ['first_name', 'last_name', 'password', 'username'];
    return (Object.keys(resObj).length === requiredPostFields.length &&
    requiredPostFields.every(field => Object.keys(resObj).includes(field)));
}

export const isValidPutReq = (resObj) => {
    const validPutFields = ['first_name', 'last_name', 'password'];
    return (Object.keys(resObj).length === validPutFields.length &&
    validPutFields.every(field => Object.keys(resObj).includes(field)));
}