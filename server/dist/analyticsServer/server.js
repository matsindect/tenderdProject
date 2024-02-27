"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./config/socket");
const producer_constroller_1 = require("./controllers/producer.constroller");
const consumer_controller_1 = require("./controllers/consumer.controller");
const vehicle_routes_1 = __importDefault(require("./routes/vehicle.routes"));
const iotDevice_routes_1 = __importDefault(require("./routes/iotDevice.routes"));
const logs_route_1 = __importDefault(require("./routes/logs.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const port = 8082;
class App {
    constructor(port) {
        this.port = port;
        // Swagger options
        const options = {
            swaggerDefinition: {
                // openapi:'3.0.0',
                info: {
                    title: 'Vehicle Tracking System',
                    version: '1.0.0',
                    description: 'A simplified version of a Fleet Management System',
                },
                servers: ['http:localhost:8082']
            },
            apis: [
                path_1.default.resolve(__dirname, './routes/vehicle.routes.js'),
                path_1.default.resolve(__dirname, './routes/iotDevices.routes.js')
            ], // Path to the API docs
        };
        // Initialize swagger-jsdoc
        const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
        const app = (0, express_1.default)();
        // app.use(express.static(path.join(__dirname, '../client')));
        // Add middleware
        app.use(body_parser_1.default.json()); // Parse JSON request bodies
        app.use((0, helmet_1.default)()); // Set various HTTP headers for security
        app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS)
        // Serve Swagger UI
        app.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
        // Use the vehicleRouer
        app.use("/api/vehicles", vehicle_routes_1.default);
        app.use("/api/devices", iotDevice_routes_1.default);
        app.use("/api/logs", logs_route_1.default);
        this.server = http_1.default.createServer(app);
    }
    start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`);
            // Initialize Socket.IO
            const io = new socket_1.SocketManager().initialize(this.server);
            io.on('connection', (socket) => {
                socket.on("Hello", (data) => {
                    console.log(data);
                });
            });
            // //Start Producing Data
            new producer_constroller_1.KafkaProduced("gps_data");
            //Start Consuming
            setTimeout(() => {
                new consumer_controller_1.KafkaConsumer("gps_data", io);
            }, 5000);
        });
    }
}
const app = new App(port);
app.start();
exports.default = app;
//# sourceMappingURL=server.js.map