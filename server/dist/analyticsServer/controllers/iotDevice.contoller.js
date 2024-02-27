"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTDevice = void 0;
const iotDevice_model_1 = __importDefault(require("../models/iotDevice.model"));
class IoTDevice {
    constructor() { }
    // Method to create a new vehicle
    async createIoTDevice(data) {
        try {
            const IoTDevice = new iotDevice_model_1.default(data);
            const savedIoTDevice = await IoTDevice.save();
            return savedIoTDevice;
        }
        catch (error) {
            throw new Error(`Failed to create IoTDevice: ${error.message}`);
        }
    }
    // Method to retrieve a vehicle by ID
    async getIoTDeviceById(id) {
        try {
            const IoTDevice = await iotDevice_model_1.default.findById(id);
            return IoTDevice;
        }
        catch (error) {
            throw new Error(`Failed to retrieve IoTDevice: ${error.message}`);
        }
    }
    // Method to retrieve all vehicles
    async getAllIoTDevices() {
        try {
            const IoTDevice = await iotDevice_model_1.default.find({ isActive: false });
            if (IoTDevice && IoTDevice.length > 0) {
                return IoTDevice;
            }
            else {
                const devices = [
                    { deviceId: "YDER-123457-mdy", isActive: false },
                    { deviceId: "YDER-6254h7-dre", isActive: false },
                    { deviceId: "YDER-1234f7-mvy", isActive: false },
                    { deviceId: "YDER-r23457-mgy", isActive: false },
                ];
                // Create an array to store promises returned by save operation
                const savePromises = [];
                // Loop through the data array and create mongoose documents
                devices.forEach(data => {
                    const iotdevice = new iotDevice_model_1.default(data);
                    // Push the save operation promise to the array
                    savePromises.push(iotdevice.save());
                });
                // Execute all save operations concurrently
                await Promise.all(savePromises);
                const IoTDevice = await iotDevice_model_1.default.find({ isActive: false });
                return IoTDevice;
            }
        }
        catch (error) {
            throw new Error(`Failed to retrieve IoTDevice: ${error.message}`);
        }
    }
    // Method to update a vehicle by ID
    async updateIoTDeviceById(id, updates) {
        try {
            const IoTDevice = await iotDevice_model_1.default.findByIdAndUpdate(id, updates, {
                new: true,
            });
            return IoTDevice;
        }
        catch (error) {
            throw new Error(`Failed to update vehicle: ${error.message}`);
        }
    }
    // Method to delete a vehicle by ID
    async deleteIoTDeviceById(id) {
        try {
            await iotDevice_model_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw new Error(`Failed to delete vehicle: ${error.message}`);
        }
    }
}
exports.IoTDevice = IoTDevice;
//# sourceMappingURL=iotDevice.contoller.js.map