import express from "express";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { SocketManager } from "./config/socket";
import { KafkaProduced } from "./controllers/producer.constroller";
import { KafkaConsumer } from "./controllers/consumer.controller";
import vehicleRouer from "./routes/vehicle.routes";
import iotDeviceRouer from "./routes/iotDevice.routes";
import logsRouter from "./routes/logs.route";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const port: number = 8082;

class App {
  private server: http.Server;
  private port: number;

  constructor(port: number) {
    this.port = port;
    // Swagger options
    const options: swaggerJsdoc.Options = {
      swaggerDefinition: {
        // openapi:'3.0.0',
        info: {
          title: 'Vehicle Tracking System',
          version: '1.0.0',
          description: 'A simplified version of a Fleet Management System',
        },
        servers:['http:localhost:8082']
      },
      apis: [
        path.resolve(__dirname, './routes/vehicle.routes.js'),
        path.resolve(__dirname, './routes/iotDevices.routes.js')
      ], // Path to the API docs
    };

    // Initialize swagger-jsdoc
    const swaggerSpec = swaggerJsdoc(options);
    const app = express();
    // app.use(express.static(path.join(__dirname, '../client')));
    // Add middleware
    app.use(bodyParser.json()); // Parse JSON request bodies
    app.use(helmet()); // Set various HTTP headers for security
    app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
    // Serve Swagger UI
    app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Use the vehicleRouer
    app.use("/api/vehicles", vehicleRouer);
    app.use("/api/devices", iotDeviceRouer);
    app.use("/api/logs", logsRouter);
    this.server = http.createServer(app);
  }

  public start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`);
      // Initialize Socket.IO
      const io = new SocketManager().initialize(this.server);
      io.on('connection',(socket)=>{
        socket.on("Hello",(data)=>{
          console.log(data)
        })
      })
      // //Start Producing Data
      new KafkaProduced("gps_data")
      //Start Consuming
      setTimeout(()=>{
        new KafkaConsumer("gps_data", io)
      }, 5000)
      
    });
  }
}

const app = new App(port);
app.start();

export default app;
