import mongoose from "mongoose";
import { Schema } from "mongoose";

const ackScehma = new mongoose.Schema({
    messageId: {
        type: Schema.Types.ObjectId, 
        ref: 'Message',
        required: true
    },

    ackStatus:{
        type: Boolean,
        required: true
    }
})

const Ack = mongoose.model("Ack", ackScehma)

export default Ack;