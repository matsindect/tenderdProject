import socketIO from 'socket.io';
import { KafkaClient, Consumer } from "kafka-node";
import { KafkaConnection } from "../config/kafkaConnect";

export class KafkaConsumer {
  private client: KafkaClient;
  private consumer: Consumer;
  private config: any;
  

  constructor(private topic: string, private io: socketIO.Server) {
    this.config = new KafkaConnection().clientCofig
    this.client = new KafkaConnection().connect();
    this.consumer = new Consumer(
      this.client,
      [{ topic: topic }],
      {
        groupId: this.config.groupId,
        autoCommit: this.config.autoCommit,
        autoCommitIntervalMs: this.config.autoCommitIntervalMs,
      }
    );
    
    this.io = io;
    this.consumer.on("message", this.handleMessage.bind(this));
    this.consumer.on("error", this.handleError.bind(this));
  }

  private handleMessage(message: any) {
    try {
      const iotData = JSON.parse(message.value);
      // Process the received IoT data as needed
      this.io.emit(message.topic,{
        topic:message.topic,
        data:iotData
    })
      console.log("Received IoT data:", iotData);
      console.log("Topic:", message.topic);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }

  private handleError(error: any) {
    console.error("Kafka consumer error:", error);
  }
}
