module.exports  = function (mongoose, crypto) {

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
        email: {type: String, unique: true, required: true},
        password: {type: String, unique: true, required: true},
        role: {type: String, required: true},
        updated_at: Date,
        todos : [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
    });

    UserSchema.pre('save', function (next, data) {

        var shaSum = crypto.createHash('sha256');
        shaSum.update(this.password);
        this.password = shaSum.digest('hex');
        next();

    });


    var User = mongoose.model('User', UserSchema);



    return {
        User: User,
        Todo: Todo
    }

};


