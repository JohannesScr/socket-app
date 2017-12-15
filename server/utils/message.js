const moment = require('moment');

let generate_message = (from, text) => {
    return {
        from,
        text,
        created_at: moment().valueOf()
    };
};

let generate_location_message = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        created_at: moment().valueOf()
    }
};

module.exports = {
    generate_message,
    generate_location_message
};