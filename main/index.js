import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"
import { setupRabbitMQ } from "./rabbit/setUpRabbit.js";
import broadcastRouter from "./routes/broadcast.routes.js"
import ackRouter from "./routes/ack.routes.js"
import { getChannel } from "./rabbit/connection.js";
import { createAckRecord } from "./db/createAckRecord.js";

dotenv.config();

const app = express();

app.use(express.json());

import cors from "cors";

app.use(cors({
    origin: "http://localhost:5173"
}));

const PORT = process.env.PORT || 3000;

await connectDB()
await setupRabbitMQ()

app.listen(PORT, () => {
    console.log(`Main server running on port ${PORT}`);
});

app.use("/broadcast", broadcastRouter)
app.use("/ack", ackRouter)

const channel = getChannel()

channel.consume("ack.queue", async (ackMessage) => {
    if(!ackMessage) return;

    try {
        const ack = JSON.parse(ackMessage.content.toString())

        console.log(`Recieved ACK message from ${ack.consumer}`)

        await createAckRecord(ack)
        channel.ack(ackMessage)
    } catch (error) {
        console.error("Ack record job failed:", error);

        channel.nack(ackMessage, false, true);
    }
})