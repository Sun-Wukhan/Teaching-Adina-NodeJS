let requestTime = function (req, res, next) {
    const log = `Time: ${Date.now()}, Method: ${req.method}, Path: ${req.originalUrl}`;
    console.log(log);
    next();
}

module.exports = requestTime;