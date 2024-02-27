"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumer = void 0;
const kafka_node_1 = require("kafka-node");
const kafkaConnect_1 = require("../config/kafkaConnect");
class KafkaConsumer {
    constructor(topic, io) {
        this.topic = topic;
        this.io = io;
        this.config = new kafkaConnect_1.KafkaConnection().clientCofig;
        this.client = new kafkaConnect_1.KafkaConnection().connect();
        this.consumer = new kafka_node_1.Consumer(this.client, [{ topic: topic }], {
            groupId: this.config.groupId,
            autoCommit: this.config.autoCommit,
            autoCommitIntervalMs: this.config.autoCommitIntervalMs,
        });
        this.io = io;
        this.consumer.on("message", this.handleMessage.bind(this));
        this.consumer.on("error", this.handleError.bind(this));
    }
    handleMessage(message) {
        try {
            const iotData = JSON.parse(message.value);
            // Process the received IoT data as needed
            this.io.emit(message.topic, {
                topic: message.topic,
                data: iotData
            });
            console.log("Received IoT data:", iotData);
            console.log("Topic:", message.topic);
        }
        catch (error) {
            console.error("Error processing message:", error);
        }
    }
    handleError(error) {
        console.error("Kafka consumer error:", error);
    }
}
exports.KafkaConsumer = KafkaConsumer;
//# sourceMappingURL=consumer.controller.js.map