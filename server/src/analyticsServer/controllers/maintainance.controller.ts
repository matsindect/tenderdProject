import VehicleMaintenanceRecordModel, {
  IVehicleMaintenanceRecord,
} from "../models/maintainanceLogs.model";
import VehicleModel from "../models/vehicle.model";
import { HelperClass } from "./helper.controller";
export class MainainanceRecords {
  constructor() {}
  // Method to create a new vehicle
  async createLogs(data: IVehicleMaintenanceRecord): Promise<any> {
    try {
      const MaintainanceRecord = new VehicleMaintenanceRecordModel({
        date: data.date,
        milage: data.milage,
        reportOfWorkPerformed: data.reportOfWorkPerformed,
        costs: data.costs,
        notes: data.notes,
        vehicle: data.vehicle
      });
      const savedMaintainanceRecord = await MaintainanceRecord.save();
      await new HelperClass().changeVehicleStatus(savedMaintainanceRecord._id);

      return {
        _id: savedMaintainanceRecord._id,
        date: savedMaintainanceRecord.date,
        milage: savedMaintainanceRecord.milage,
        reportOfWorkPerformed: savedMaintainanceRecord.reportOfWorkPerformed,
        costs: savedMaintainanceRecord.costs,
        notes: savedMaintainanceRecord.notes,
        vehicle: (await VehicleModel.findById( data.vehicle))
          .regNumber,
      };
    } catch (error) {
      throw new Error(`Failed to create MaintainanceRecord: ${error.message}`);
    }
  }

  // Method to retrieve a vehicle by ID
  async getMaintainanceRecordById(id: string): Promise<any> {
    try {
      const MaintainanceRecord = await VehicleMaintenanceRecordModel.findById(
        id
      );
      return MaintainanceRecord;
    } catch (error) {
      throw new Error(
        `Failed to retrieve MaintainanceRecord: ${error.message}`
      );
    }
  }

  // Method to retrieve all vehicles
  async getAllMaintainanceRecords(): Promise<any> {
    try {
      const MaintainanceRecord = await VehicleMaintenanceRecordModel.find().populate("vehicle");
      let logData = [];
      await Promise.all(
        MaintainanceRecord.map((log) => {
          logData.push({
            _id: log._id,
            date: log.date,
            milage: log.milage,
            reportOfWorkPerformed: log.reportOfWorkPerformed,
            costs: log.costs,
            notes: log.notes,
            vehicle: log.vehicle?.regNumber
          });
        })
      );
      return logData;
    } catch (error) {
      throw new Error(
        `Failed to retrieve MaintainanceRecord: ${error.message}`
      );
    }
  }
  // Method to update a log by ID
  async updateMaintainanceRecordById(id: string, updates: any): Promise<any> {
    try {
      const MaintainanceRecord =
        await VehicleMaintenanceRecordModel.findByIdAndUpdate(id, updates, {
          new: true,
        });
      return MaintainanceRecord;
    } catch (error) {
      throw new Error(`Failed to update vehicle: ${error.message}`);
    }
  }

  // Method to delete a vehicle by ID
  async deleteMaintainanceRecordById(id: string): Promise<void> {
    try {
      await VehicleMaintenanceRecordModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Failed to delete vehicle: ${error.message}`);
    }
  }
}
