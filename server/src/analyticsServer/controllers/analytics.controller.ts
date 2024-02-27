import socketIO from 'socket.io';
import { SocketManager } from "../config/socket";
import { KafkaConsumer } from './consumer.controller';


export default class Analytics {
    constructor( private io: socketIO.Server) {
        console.log(io)
        this.io = io
    }

    public sockets = async()=>{
        // Handling Socket.IO events
        this.io.on("connection", (socket) => {
            socket.on("gps_data",()=>{
                // new KafkaConsumer("gps_data", this.io)
            })
        });
    }

}