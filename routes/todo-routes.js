module.exports = function (Todo) {

    /*
     * GET home page.
     */

    var index = function (req, res) {
        res.render('index', { title: 'Express' });
    };

    /*
     * Get all records
     */

    var getAll = function(req, res){
        Todo.find( function ( err, todos, count ){
            res.send(todos);
        });
    }

    /*
     * Create one record
     */

    var get = function(req, res){
        Todo.findById( req.params.id, function ( err, todo ){
            res.send(todo);
        });
    }

    /*
     * Create record
     */

    var post = function (req, res) {
        var todo = new Todo({
            content: req.body.content,
            updated_at: Date.now()
        });

        todo.save(function (err, todo, count) {
                res.send(todo);
            }
        );
    };

    /*
     * Update record by id
     */

    var put = function (req, res) {
        delete req.body._id;
        Todo.findByIdAndUpdate(req.params.id, req.body, function (err, numberAffected, raw) {
            res.send(200);
        });
    };


    /*
     * Delete record by id
     */

    var destroy = function(req, res){
        Todo.findById( req.params.id, function ( err, todo ){
            todo.remove( function ( err, todo ){
                res.send(todo);
            });
        });
    }

    return{
        index: index,
        getAll: getAll,
        get: get,
        post: post,
        put: put,
        destroy: destroy
    }
}




