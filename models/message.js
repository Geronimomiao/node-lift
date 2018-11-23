var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    "mid": Number,
    "type": Number,
    "title": String,
    "message": String,
    "imgs": Array,
    "status_code": Number
});


module.exports = mongoose.model("Message", messageSchema);

