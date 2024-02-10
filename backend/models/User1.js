const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    Date: {
        type: String,
        default: Date.now
        // Here do not use date.now(). because it will be called immediately
        // Where Our requirement is to call this when object is actually inserted
    }


})

module.exports = mongoose.model("user", userSchema);