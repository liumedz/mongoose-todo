module.exports = function(app) {

    var canExecute = function(roles, role){
        var can = false;

        if(roles.length > 0){
            roles.forEach(function(item){
                if(item === role || item === "*"){
                    can = true;
                }
            });
        }
        else{
            can = true;
        }

        return can;
    }


    var middleware = function(roles, route, req, res, next){

        if(canExecute(roles, req.session.role)){
            next();
        }
        else{
            res.send("You dont havw access!");
        }
    }

    var get = function(roles, route, callback){
        app.get(route, function(req, res, next){
            middleware(roles, route, req, res, next);
        }, callback);
    }

    var post = function(roles, route, callback){
        app.post(route, function(req, res, next){
            middleware(roles, route, req, res, next);
        }, callback);
    }

    var put = function(roles, route, callback){
        app.put(route, function(req, res, next){
            middleware(roles, route, req, res, next);
        }, callback);
    }

    var destroy = function(roles, route, callback){
        app.delete(route, function(req, res, next){
            middleware(roles, route, req, res, next);
        }, callback);
    }

    return {
        get: get,
        post: post,
        put: put,
        delete: destroy
    }
}