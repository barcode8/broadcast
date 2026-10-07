import express from "express"
import dotenv from "dotenv"
import { connectRabbit, getChannel } from "./rabbit/connection.js";
import { sendAckConfirmation } from "./rabbit/sendAckConfirmation.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

await connectRabbit()
const channel = getChannel()
const role = "user"

channel.consume("user1.queue", async (message) => {
    if(!message) return;

    try {
        const broadcastMessage = JSON.parse(message.content.toString());

        console.log("Received message job from user1:");
        console.log(broadcastMessage);

        channel.ack(message);
        const ack = {
            messageId : broadcastMessage._id,
            consumer : role,
            ackStatus : true
        }
        sendAckConfirmation(ack)
    } catch (error) {
        console.error("Message job failed:", error);

        channel.nack(message, false, true);
    }
})

app.listen(PORT, () => {
    console.log(`User1 server running on port ${PORT}`);
});