import mongoose from "mongoose";

const messageScehma = new mongoose.Schema({
    content: {
        type: string,
        required: true
    },

    clearance:{
        type: string,
        required: true
    }
})

const Message = mongoose.model("Message", messageScehma)

export default Message;