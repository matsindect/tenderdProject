"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProduced = void 0;
const kafka_node_1 = require("kafka-node");
const kafkaConnect_1 = require("../config/kafkaConnect");
const axios_1 = __importDefault(require("axios"));
const polyline_1 = __importDefault(require("polyline"));
class KafkaProduced {
    constructor(kafkaTopic) {
        this.sendGpsDataToKafka = async (gpsData) => {
            try {
                const payloads = [
                    {
                        topic: this.kafkaTopic,
                        messages: gpsData,
                    },
                ];
                this.kafkaProducer.send(payloads, (err, data) => {
                    if (err) {
                        console.error("Error sending data to Kafka:", err);
                    }
                    else {
                        console.log("Sent GPS data to Kafka:", gpsData);
                    }
                });
            }
            catch (error) {
                console.error("Error sending GPS data to Kafka:", error);
            }
        };
        this.kafkaClient = new kafkaConnect_1.KafkaConnection().connect();
        this.kafkaProducer = new kafka_node_1.Producer(this.kafkaClient);
        this.kafkaTopic = kafkaTopic;
        // Simulate GPS route coordinates
        this.currentIndex = 0;
        this.kafkaProducer.on("ready", () => {
            console.log('Kafka producer is ready');
            this.simulateGPSDirections();
        });
        // Event handler for producer error event
        this.kafkaProducer.on("error", (error) => {
            console.error("Error in Kafka producer:", error);
        });
    }
    async simulateGPSDirections() {
        // Replace 'YOUR_API_KEY' with your actual Google Maps API Key
        const apiKey = "AIzaSyBgFRUldkVXqqIkelgOASG-97UnsAnJKmg";
        const origin = "DMCC, Dubai, UAE"; // Starting point
        const destination = "Dubai Airport Freezone, Dubai, UAE"; // Ending point
        // Make the API request to Google Maps Directions API
        const { data } = await axios_1.default.post("https://maps.googleapis.com/maps/api/directions/json", null, {
            params: {
                origin: origin,
                destination: destination,
                key: apiKey,
            },
        });
        // Extract the route coordinates from the response
        const route = data.routes[0];
        const path = route.overview_polyline.points;
        // Decode the polyline to get the coordinates
        const decodedPath = polyline_1.default.decode(path);
        let response = [];
        if (decodedPath && decodedPath.length > 0) {
            await Promise.all(decodedPath.map((ordinate, i) => {
                const lat1 = decodedPath[i][0];
                const lng1 = decodedPath[i][1];
                const lastIndex = decodedPath.length - 1;
                let lat2 = null;
                let lng2 = null;
                if (lastIndex === i) {
                    lat2 = decodedPath[i - 1][0];
                    lng2 = decodedPath[i - 1][1];
                }
                else {
                    lat2 = decodedPath[i + 1][0];
                    lng2 = decodedPath[i + 1][1];
                }
                const dLng = (lng2 - lng1) * (Math.PI / 180);
                const lat1Rad = lat1 * (Math.PI / 180);
                const lat2Rad = lat2 * (Math.PI / 180);
                const y = Math.sin(dLng) * Math.cos(lat2Rad);
                const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
                    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
                let bearing = Math.atan2(y, x) * (180 / Math.PI);
                bearing = (bearing + 360) % 360; // Ensure the result is between 0 and 360 degrees
                response.push({ lat: ordinate[0], lng: ordinate[1], bearing: bearing });
            }));
        }
        const intervalId = setInterval(() => {
            if (this.currentIndex >= response.length) {
                clearInterval(intervalId); // Stop producing data when all coordinates are sent
                return;
            }
            // Get the current coordinate from the route
            const gpsData = response[this.currentIndex++];
            this.sendGpsDataToKafka(JSON.stringify(gpsData));
        }, 5000); // Send data every 5 seconds
        // Use the coordinates to display the route on a map
        // Example: displayRoute(decodedPath);
    }
}
exports.KafkaProduced = KafkaProduced;
//# sourceMappingURL=producer.constroller.js.map