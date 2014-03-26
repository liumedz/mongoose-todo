module.exports = function(secureRoutes, db, crypto) {

    var mainRoutes = require('../routes/main-routes')(db.User, crypto);
    var todoRoutes = require('../routes/todo-routes')(db.Todo);
    var userRoutes = require('../routes/user-routes')(db.User);

    var map = function(){

        secureRoutes.get(['*'], '/', mainRoutes.index);
        secureRoutes.get(['*'], '/login', mainRoutes.login);
        secureRoutes.get(['admin', 'user'], '/logout', mainRoutes.onLogout);
        secureRoutes.get(['admin'], '/page1', mainRoutes.page1);
        secureRoutes.get(['user'], '/page2', mainRoutes.page2);
        secureRoutes.post(['*'], '/login', mainRoutes.onLogin);

        secureRoutes.get(['admin', 'user'], '/todos', todoRoutes.getAll);
        secureRoutes.get(['admin', 'user'], '/todos/:id', todoRoutes.get);
        secureRoutes.post(['admin', 'user'], '/todos', todoRoutes.post);
        secureRoutes.put(['admin', 'user'], '/todos/:id', todoRoutes.put);
        secureRoutes.delete(['admin', 'user'], '/todos/:id', todoRoutes.destroy);


        secureRoutes.get(['admin'], '/users', userRoutes.getAll);
        secureRoutes.get(['admin'], '/users/:id', userRoutes.get);


        secureRoutes.post(['admin'], '/users', userRoutes.post);
        secureRoutes.put(['admin'], '/users/:id', userRoutes.put);
        secureRoutes.delete(['admin'], '/users/:id', userRoutes.destroy);
        secureRoutes.put(['admin'], '/users/:id/todos/:todoId', userRoutes.assignTodo);

    }

    return {
        map: map
    }
}