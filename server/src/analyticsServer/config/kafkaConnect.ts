import { KafkaClient} from 'kafka-node';
export interface KafkaConfig {
    kafkaHost: string;
    groupId: string;
    autoCommit: boolean;
    autoCommitIntervalMs: number;
}

export class KafkaConnection {
    private kafkaClient: KafkaClient;
    private kafkaConfig: KafkaConfig = {
        kafkaHost: 'localhost:9092',
        groupId: 'iot_consumer_group',
        autoCommit: true,
        autoCommitIntervalMs: 5000,
      };
      
    constructor() {
        this.kafkaClient = null
    }

    public initialize = async(kafkaHost: string) => {
        this.kafkaClient = new KafkaClient({ kafkaHost });
    }

    public connect=(): KafkaClient => {
        this.initialize(this.kafkaConfig.kafkaHost)
        if (!this.kafkaClient) {
            throw new Error('kafkaClient is not initialized');
        }
        return this.kafkaClient;
    }
    public clientCofig = ()=>{
         const { kafkaHost, ...configWithoutKafkaHost } = this.kafkaConfig;
         return configWithoutKafkaHost
    }
}