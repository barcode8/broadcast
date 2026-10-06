import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"
import { setupRabbitMQ } from "./rabbit/setUpRabbit.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

await connectDB()
await setupRabbitMQ()

app.listen(PORT, () => {
    console.log(`Order server running on port ${PORT}`);
});