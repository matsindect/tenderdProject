"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Analytics {
    constructor(io) {
        this.io = io;
        this.sockets = async () => {
            // Handling Socket.IO events
            this.io.on("connection", (socket) => {
                socket.on("gps_data", () => {
                    // new KafkaConsumer("gps_data", this.io)
                });
            });
        };
        console.log(io);
        this.io = io;
    }
}
exports.default = Analytics;
//# sourceMappingURL=analytics.controller.js.map