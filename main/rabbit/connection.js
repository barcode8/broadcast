import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

let connection;
let channel;

export const connectRabbit = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("RabbitMQ connected")

        return channel;
    } catch (error) {
        console.log(error)
    }
};

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    return channel;
};