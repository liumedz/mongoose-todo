module.exports = function (User) {

    /*
     * Get all records
     */

    var getAll = function (req, res) {
        User.find(function (err, todos, count) {
            res.send(todos);
        });
    }

    /*
     * Get one record
     */

    var get = function (req, res) {
        User.findById(req.params.id)
            .populate('todos')
            .exec(function (err, user) {
                if (err) return handleError(err);
                res.send(user);
            }
        );
    }

    /*
     * Create record
     */

    var post = function (req, res) {
        var todo = new User(req.body);

        todo.save(function (err, user, count) {
                res.send(user);
            }
        );
    };

    /*
     * Update record by id
     */

    var put = function (req, res) {
        delete req.body._id;
        User.findByIdAndUpdate(req.params.id, req.body, function (err, numberAffected, raw) {
            res.send(200);
        });
    };


    /*
     * Delete record by id
     */

    var destroy = function (req, res) {
        User.findById(req.params.id, function (err, todo) {
            todo.remove(function (err, todo) {
                res.send(todo);
            });
        });
    }

    /*
     * Assign todotask to user
     */

    var assignTodo = function (req, res) {
        User.findById(req.params.id, function (err, user) {
            user.todos.push(req.params.todoId);
            user.save(function (err, user, count) {
                    res.send(user);
                }
            );
        });
    };

    return{
        getAll: getAll,
        get: get,
        post: post,
        put: put,
        destroy: destroy,
        assignTodo: assignTodo
    }
}




