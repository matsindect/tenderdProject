"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainainanceRecords = void 0;
const maintainanceLogs_model_1 = __importDefault(require("../models/maintainanceLogs.model"));
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const helper_controller_1 = require("./helper.controller");
class MainainanceRecords {
    constructor() { }
    // Method to create a new vehicle
    async createLogs(data) {
        try {
            const MaintainanceRecord = new maintainanceLogs_model_1.default({
                date: data.date,
                milage: data.milage,
                reportOfWorkPerformed: data.reportOfWorkPerformed,
                costs: data.costs,
                notes: data.notes,
                vehicle: data.vehicle
            });
            const savedMaintainanceRecord = await MaintainanceRecord.save();
            await new helper_controller_1.HelperClass().changeVehicleStatus(savedMaintainanceRecord._id);
            return {
                _id: savedMaintainanceRecord._id,
                date: savedMaintainanceRecord.date,
                milage: savedMaintainanceRecord.milage,
                reportOfWorkPerformed: savedMaintainanceRecord.reportOfWorkPerformed,
                costs: savedMaintainanceRecord.costs,
                notes: savedMaintainanceRecord.notes,
                vehicle: (await vehicle_model_1.default.findById(data.vehicle))
                    .regNumber,
            };
        }
        catch (error) {
            throw new Error(`Failed to create MaintainanceRecord: ${error.message}`);
        }
    }
    // Method to retrieve a vehicle by ID
    async getMaintainanceRecordById(id) {
        try {
            const MaintainanceRecord = await maintainanceLogs_model_1.default.findById(id);
            return MaintainanceRecord;
        }
        catch (error) {
            throw new Error(`Failed to retrieve MaintainanceRecord: ${error.message}`);
        }
    }
    // Method to retrieve all vehicles
    async getAllMaintainanceRecords() {
        try {
            const MaintainanceRecord = await maintainanceLogs_model_1.default.find().populate("vehicle");
            let logData = [];
            await Promise.all(MaintainanceRecord.map((log) => {
                var _a;
                logData.push({
                    _id: log._id,
                    date: log.date,
                    milage: log.milage,
                    reportOfWorkPerformed: log.reportOfWorkPerformed,
                    costs: log.costs,
                    notes: log.notes,
                    vehicle: (_a = log.vehicle) === null || _a === void 0 ? void 0 : _a.regNumber
                });
            }));
            return logData;
        }
        catch (error) {
            throw new Error(`Failed to retrieve MaintainanceRecord: ${error.message}`);
        }
    }
    // Method to update a log by ID
    async updateMaintainanceRecordById(id, updates) {
        try {
            const MaintainanceRecord = await maintainanceLogs_model_1.default.findByIdAndUpdate(id, updates, {
                new: true,
            });
            return MaintainanceRecord;
        }
        catch (error) {
            throw new Error(`Failed to update vehicle: ${error.message}`);
        }
    }
    // Method to delete a vehicle by ID
    async deleteMaintainanceRecordById(id) {
        try {
            await maintainanceLogs_model_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw new Error(`Failed to delete vehicle: ${error.message}`);
        }
    }
}
exports.MainainanceRecords = MainainanceRecords;
//# sourceMappingURL=maintainance.controller.js.map