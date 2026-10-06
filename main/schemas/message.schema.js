import mongoose from "mongoose";

const messageScehma = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    clearance:{
        type: String,
        required: true
    }
})

const Message = mongoose.model("Message", messageScehma)

export default Message;