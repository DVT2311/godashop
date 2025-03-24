module.exports = function authService(req, res, next) {
    // if (req.session || req.session.user) {
    if (req.session && req.session.user) {
        // console.log(req.user)
        return next();
    } else {
        return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
    }
};
