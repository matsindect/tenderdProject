import IoTDeviceModel, { IIoTDevice } from "../models/iotDevice.model";
export class IoTDevice {
  constructor() {}
  // Method to create a new vehicle
  async createIoTDevice(data: IIoTDevice): Promise<any> {
    try {
      const IoTDevice = new IoTDeviceModel(data);
      const savedIoTDevice = await IoTDevice.save();
      return savedIoTDevice;
    } catch (error) {
      throw new Error(`Failed to create IoTDevice: ${error.message}`);
    }
  }

  // Method to retrieve a vehicle by ID
  async getIoTDeviceById(id: string): Promise<any> {
    try {
      const IoTDevice = await IoTDeviceModel.findById(id);
      return IoTDevice;
    } catch (error) {
      throw new Error(`Failed to retrieve IoTDevice: ${error.message}`);
    }
  }

  // Method to retrieve all vehicles
  async getAllIoTDevices(): Promise<any> {
    try {
      const IoTDevice = await IoTDeviceModel.find({isActive:false});
      if(IoTDevice && IoTDevice.length > 0){
        return IoTDevice;
      }else{
        const devices =[
          {deviceId:"YDER-123457-mdy", isActive:false},
          {deviceId:"YDER-6254h7-dre", isActive:false},
          {deviceId:"YDER-1234f7-mvy", isActive: false},
          {deviceId:"YDER-r23457-mgy", isActive: false},
         ]
         // Create an array to store promises returned by save operation
        const savePromises = [];

        // Loop through the data array and create mongoose documents
        devices.forEach(data => {
          const iotdevice = new IoTDeviceModel(data);
          // Push the save operation promise to the array
          savePromises.push(iotdevice.save());
        });

        // Execute all save operations concurrently
        await Promise.all(savePromises)

        const IoTDevice = await IoTDeviceModel.find({isActive:false});
        return IoTDevice
      }
      
    } catch (error) {
      throw new Error(`Failed to retrieve IoTDevice: ${error.message}`);
    }
  }
  // Method to update a vehicle by ID
  async updateIoTDeviceById(id: string, updates: any): Promise<any> {
    try {
      const IoTDevice = await IoTDeviceModel.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return IoTDevice;
    } catch (error) {
      throw new Error(`Failed to update vehicle: ${error.message}`);
    }
  }

  // Method to delete a vehicle by ID
  async deleteIoTDeviceById(id: string): Promise<void> {
    try {
      await IoTDeviceModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Failed to delete vehicle: ${error.message}`);
    }
  }
}
