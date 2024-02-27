"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
class SocketManager {
    constructor() {
        this.io = null;
    }
    initialize(server) {
        this.io = new socket_io_1.default.Server(server, {
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
exports.SocketManager = SocketManager;
//# sourceMappingURL=socket.js.map