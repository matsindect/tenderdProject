"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConnection = void 0;
const kafka_node_1 = require("kafka-node");
class KafkaConnection {
    constructor() {
        this.kafkaConfig = {
            kafkaHost: 'localhost:9092',
            groupId: 'iot_consumer_group',
            autoCommit: true,
            autoCommitIntervalMs: 5000,
        };
        this.initialize = async (kafkaHost) => {
            this.kafkaClient = new kafka_node_1.KafkaClient({ kafkaHost });
        };
        this.connect = () => {
            this.initialize(this.kafkaConfig.kafkaHost);
            if (!this.kafkaClient) {
                throw new Error('kafkaClient is not initialized');
            }
            return this.kafkaClient;
        };
        this.clientCofig = () => {
            const { kafkaHost, ...configWithoutKafkaHost } = this.kafkaConfig;
            return configWithoutKafkaHost;
        };
        this.kafkaClient = null;
    }
}
exports.KafkaConnection = KafkaConnection;
//# sourceMappingURL=kafkaConnect.js.map