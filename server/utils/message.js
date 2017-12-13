let generate_message = (from, text) => {
    return {
        from,
        text,
        created_at: new Date().getTime()
    };
};

let generate_location_message = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        created_at: new Date().getTime()
    }
};

module.exports = {
    generate_message,
    generate_location_message
};