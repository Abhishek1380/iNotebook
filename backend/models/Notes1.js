const mongoose = require("mongoose");
const { Schema } = mongoose;
const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,

    }
    ,
    Date: {
        type: String,
        default: Date.now
        // Here do not use date,now(). because it will be called immediately
        // Where Our requirement is to call this when object is actually inserted
    }


})

module.exports = mongoose.model("Notes", notesSchema);