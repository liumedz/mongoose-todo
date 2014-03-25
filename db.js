module.exports  = function (mongoose) {

    var Schema = mongoose.Schema;


    var TodoSchema = new Schema({
        content: String,
        updated_at: Date
    });

    var Todo = mongoose.model('Todo', TodoSchema);

    var UserSchema = new Schema({
        name: {
            first: String,
            last: String
        },
        email: String,
        password: String,
        updated_at: Date,
        todos : [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
    });

    var User = mongoose.model('User', UserSchema);

    return {
        User: User,
        Todo: Todo
    }

};


