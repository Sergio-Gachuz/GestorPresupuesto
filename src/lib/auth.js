module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    userLogged(req, res, next){
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/miperfil');
    }
}