import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

let connection;
let channel;

export const connectRabbit = async () => {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    return channel;
};

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    return channel;
};