"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const iotDevice_model_1 = __importDefault(require("../models/iotDevice.model"));
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const axios_1 = __importDefault(require("axios"));
const polyline_1 = __importDefault(require("polyline"));
const helper_controller_1 = require("./helper.controller");
class Vehicle {
    constructor() { }
    // Method to create a new vehicle
    async createVehicle(data) {
        try {
            console.log(data);
            const vehicle = new vehicle_model_1.default({
                regNumber: data.regNumber,
                vehicleModel: data.vehicleModel,
                type: data.type,
                status: data.status,
                iotDevice: data.iotDevice,
            });
            const savedVehicle = await vehicle.save();
            //Activate IoT Device
            await new helper_controller_1.HelperClass().activateIoTDevice(vehicle.iotDevice);
            //Return created vehicle
            return {
                regNumber: savedVehicle.regNumber,
                vehicleModel: savedVehicle.vehicleModel,
                type: savedVehicle.type,
                status: savedVehicle.status,
                iotDevice: (await iotDevice_model_1.default.findById(savedVehicle.iotDevice))
                    .deviceId,
            };
        }
        catch (error) {
            throw new Error(`Failed to create vehicle: ${error.message}`);
        }
    }
    // Method to retrieve a vehicle by ID
    async getVehicleById(vehicleId) {
        try {
            const vehicle = await vehicle_model_1.default.findById(vehicleId);
            return vehicle;
        }
        catch (error) {
            throw new Error(`Failed to retrieve vehicle: ${error.message}`);
        }
    }
    // Method to retrieve all vehicles
    async getAllVehicles() {
        try {
            const vehicles = await vehicle_model_1.default.find().populate("iotDevice");
            let vehicleData = [];
            await Promise.all(vehicles.map((vehicle) => {
                var _a;
                vehicleData.push({
                    regNumber: vehicle.regNumber,
                    vehicleModel: vehicle.vehicleModel,
                    type: vehicle.type,
                    status: vehicle.status,
                    iotDevice: (_a = vehicle.iotDevice) === null || _a === void 0 ? void 0 : _a.deviceId,
                    _id: vehicle._id
                });
            }));
            return vehicleData;
        }
        catch (error) {
            throw new Error(`Failed to retrieve vehicle: ${error.message}`);
        }
    }
    // Method to update a vehicle by ID
    async updateVehicleById(vehicleId, updates) {
        try {
            const vehicle = await vehicle_model_1.default.findByIdAndUpdate(vehicleId, updates, {
                new: true,
            });
            return vehicle;
        }
        catch (error) {
            throw new Error(`Failed to update vehicle: ${error.message}`);
        }
    }
    // Method to delete a vehicle by ID
    async deleteVehicleById(vehicleId) {
        try {
            await vehicle_model_1.default.findByIdAndDelete(vehicleId);
        }
        catch (error) {
            throw new Error(`Failed to delete vehicle: ${error.message}`);
        }
    }
    async getCordinates() {
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
                const lat2 = decodedPath[i + 1][0];
                const lng2 = decodedPath[i + 1][1];
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
        return response;
        // Use the coordinates to display the route on a map
        // Example: displayRoute(decodedPath);
    }
}
exports.Vehicle = Vehicle;
//# sourceMappingURL=vehicle.controller.js.map