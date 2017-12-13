exports.log_url = (req, res, next) => {
    console.log(req.url);
    next();
};