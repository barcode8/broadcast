import mongoose from "mongoose";
import { Schema } from "mongoose";

const ackSchema = new mongoose.Schema({
    messageId: {
        type: Schema.Types.ObjectId, 
        ref: 'Message',
        required: true
    },

    consumer: {
        type: String,
        enum: ["admin", "user", "email"],
        required: true
    },

    ackStatus:{
        type: Boolean,
        required: true
    }
})

ackSchema.index(
    { messageId: 1, consumer: 1 },
    { unique: true }
);

const Ack = mongoose.model("Ack", ackSchema)

export default Ack;