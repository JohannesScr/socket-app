let generate_message = (from, text) => {
    return {
        from,
        text,
        created_at: new Date().toISOString()
    };
};

module.exports = {
    generate_message
};