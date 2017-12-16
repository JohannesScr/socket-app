const is_real_string = (string) => {
    return typeof string === 'string' && string.trim().length > 0;
};

module.exports = {
    is_real_string
};