import IoTDeviceModel from "../models/iotDevice.model";
import VehicleModel, { VehicleStatus } from "../models/vehicle.model";

export class HelperClass {
  constructor() {}
  //Method to update the selected device
  public async activateIoTDevice(id): Promise<any> {
    try {
        await IoTDeviceModel.findByIdAndUpdate(id,{isActive:true}, {
            new: true,
          });
    } catch (error) {
      throw new Error(`Failed to update: ${error.message}`);
    }
  }

  public async changeVehicleStatus(id):Promise<any> {
    try {
        await VehicleModel.findByIdAndUpdate(id,{status:VehicleStatus.Maintenance}, {
            new: true,
          });
    } catch (error) {
      throw new Error(`Failed to update: ${error.message}`);
    }
  }
}
