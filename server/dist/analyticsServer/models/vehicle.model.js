"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const databaseConnect_1 = __importDefault(require("../config/databaseConnect"));
// Connect to MongoDB
(0, databaseConnect_1.default)();
var VehicleStatus;
(function (VehicleStatus) {
    VehicleStatus["Active"] = "Active";
    VehicleStatus["Inactive"] = "Inactive";
    VehicleStatus["Maintenance"] = "Maintenance";
})(VehicleStatus || (exports.VehicleStatus = VehicleStatus = {}));
const VehicleSchema = new mongoose_1.Schema({
    regNumber: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    type: { type: String, required: true },
    iotDevice: { type: mongoose_1.Schema.Types.ObjectId, ref: 'IoTDevice', required: true }, // Reference to Vehicle model
    status: { type: String, enum: ['Active', 'Maintenance', 'Inactive'], default: 'Active', required: true }
});
const VehicleModel = mongoose_1.default.model('Vehicle', VehicleSchema);
exports.default = VehicleModel;
//# sourceMappingURL=vehicle.model.js.map