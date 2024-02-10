const mongoose = require("mongoose");

const notesSchema = new schema({
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
        default: date.now
        // Here do not use date,now(). because it will be called immediately
        // Where Our requirement is to call this when object is actually inserted
    }


})

module.exports = mongoose.model("notes", notesSchema);