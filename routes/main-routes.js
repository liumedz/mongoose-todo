module.exports = function (User, crypto){

    /*
     * GET home page.
     */

    var index = function (req, res) {
        res.render('index', { title: 'Express' });
    };

    /*
     * GET login page.
     */

    var login = function (req, res) {
        res.render('login');
    };


    /*
     * GET login page.
     */

    var app = function (req, res) {
        res.render('app');
    };

    /*
     *  Login to page
     */

    var onLogin = function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        User.findOne({email: email, password: shaSum.digest('hex')}, function ( err, user, count ){

            var error = null;

            if (err){
                return handleError(req, res, err);
            }

            if(user){
                req.session.authenticated = true;
                req.session.userName = user.email;
                req.session.role = user.role;
                res.redirect("/"); return;
            }
            else{
                error = res.locals.i18n.t('login.invalidLoginInformation');
            }

            res.render("login", {error: error});

        });

    };

    /*
     *  Login to page
     */

    var onLogout = function (req, res) {

        if (req.session.authenticated) {
            req.session.authenticated = false;
            req.session.role = null;
            res.clearCookie('connect.sid', { path: '/' });
        }
        res.redirect("/");

    };

    var page1 = function (req, res) {
        res.render('page1');
    };

    var page2 = function (req, res) {
        res.render('page2');
    };

    return {
        index: index,
        login: login,
        onLogin: onLogin,
        onLogout: onLogout,
        page1: page1,
        page2: page2,
        app: app
    }
}




