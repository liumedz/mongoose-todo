module.exports = function(config) {

    var apply = function(req, res, next){
        var authenticated = req.session.authenticated;

        if(authenticated){
            return next();
        }
        else{
            if(req._parsedUrl.pathname === '/'){
                res.redirect("/login"); return;
            }
            if(req._parsedUrl.pathname === '/login'){
                return next();
            }
        }

        res.send(401); return;
    }

    return{
        apply: apply
    }
};
