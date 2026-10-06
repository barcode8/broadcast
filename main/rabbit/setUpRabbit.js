import { connectRabbit } from "./connection.js";
import { setupExchanges } from "./exchanges.js";
import { setupQueues } from "./queues.js";
import { setupBindings } from "./binding.js";

export const setupRabbitMQ = async () => {
    await connectRabbit();

    await setupExchanges();
    await setupQueues();
    await setupBindings();

    console.log("RabbitMQ setup complete");
};