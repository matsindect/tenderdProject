import http from 'http';
import socketIO from 'socket.io';

export class SocketManager {
    private io: socketIO.Server;

    constructor() {
        this.io = null;
    }

    public initialize(server: http.Server) : socketIO.Server{
        this.io = new socketIO.Server(server, {
            cors: {
              origin: "*", // Allow connections from all origins
              methods: ["GET", "POST"] // Allow all HTTP methods
            }
          });
        if (!this.io) {
            throw new Error('Socket.IO is not initialized');
        }
        return this.io;
    }
}