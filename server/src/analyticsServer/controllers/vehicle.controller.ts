import IoTDeviceModel from "../models/iotDevice.model";
import VehicleModel, { IVehicleData, LatLng } from "../models/vehicle.model";
import axios from "axios";
import polyline from "polyline";
import { HelperClass } from "./helper.controller";

export class Vehicle {
  constructor() {}
  // Method to create a new vehicle
  async createVehicle(data: IVehicleData): Promise<any> {
    try {
      console.log(data);
      const vehicle = new VehicleModel({
        regNumber: data.regNumber,
        vehicleModel: data.vehicleModel,
        type: data.type,
        status: data.status,
        iotDevice: data.iotDevice,
      });
      const savedVehicle = await vehicle.save();

      //Activate IoT Device
      await new HelperClass().activateIoTDevice(vehicle.iotDevice)

      //Return created vehicle
      return {
        regNumber: savedVehicle.regNumber,
        vehicleModel: savedVehicle.vehicleModel,
        type: savedVehicle.type,
        status: savedVehicle.status,
        iotDevice: (await IoTDeviceModel.findById(savedVehicle.iotDevice))
          .deviceId,
      };
    } catch (error) {
      throw new Error(`Failed to create vehicle: ${error.message}`);
    }
  }

  // Method to retrieve a vehicle by ID
  async getVehicleById(vehicleId: string): Promise<any> {
    try {
      const vehicle = await VehicleModel.findById(vehicleId);
      return vehicle;
    } catch (error) {
      throw new Error(`Failed to retrieve vehicle: ${error.message}`);
    }
  }

  // Method to retrieve all vehicles
  async getAllVehicles(): Promise<any> {
    try {
      const vehicles = await VehicleModel.find().populate("iotDevice");
      let vehicleData = [];
      await Promise.all(
        vehicles.map((vehicle) => {
          vehicleData.push({
            regNumber: vehicle.regNumber,
            vehicleModel: vehicle.vehicleModel,
            type: vehicle.type,
            status: vehicle.status,
            iotDevice: vehicle.iotDevice?.deviceId,
            _id:vehicle._id
          });
        })
      );
      return vehicleData;
    } catch (error) {
      throw new Error(`Failed to retrieve vehicle: ${error.message}`);
    }
  }
  // Method to update a vehicle by ID
  async updateVehicleById(vehicleId: string, updates: any): Promise<any> {
    try {
      const vehicle = await VehicleModel.findByIdAndUpdate(vehicleId, updates, {
        new: true,
      });
      return vehicle;
    } catch (error) {
      throw new Error(`Failed to update vehicle: ${error.message}`);
    }
  }

  // Method to delete a vehicle by ID
  async deleteVehicleById(vehicleId: string): Promise<void> {
    try {
      await VehicleModel.findByIdAndDelete(vehicleId);
    } catch (error) {
      throw new Error(`Failed to delete vehicle: ${error.message}`);
    }
  }

  async getCordinates(): Promise<any> {
    // Replace 'YOUR_API_KEY' with your actual Google Maps API Key
    const apiKey = "AIzaSyBgFRUldkVXqqIkelgOASG-97UnsAnJKmg";
    const origin = "DMCC, Dubai, UAE"; // Starting point
    const destination = "Dubai Airport Freezone, Dubai, UAE"; // Ending point

    // Make the API request to Google Maps Directions API
    const { data } = await axios.post(
      "https://maps.googleapis.com/maps/api/directions/json",
      null,
      {
        params: {
          origin: origin,
          destination: destination,
          key: apiKey,
        },
      }
    );
    // Extract the route coordinates from the response
    const route = data.routes[0];

    const path = route.overview_polyline.points;

    // Decode the polyline to get the coordinates
    const decodedPath = polyline.decode(path);

    let response = [];
    if (decodedPath && decodedPath.length > 0) {
      await Promise.all(
        decodedPath.map((ordinate, i) => {
          const lat1 = decodedPath[i][0];
          const lng1 = decodedPath[i][1];
          const lat2 = decodedPath[i + 1][0];
          const lng2 = decodedPath[i + 1][1];

          const dLng = (lng2 - lng1) * (Math.PI / 180);
          const lat1Rad = lat1 * (Math.PI / 180);
          const lat2Rad = lat2 * (Math.PI / 180);

          const y = Math.sin(dLng) * Math.cos(lat2Rad);
          const x =
            Math.cos(lat1Rad) * Math.sin(lat2Rad) -
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
          let bearing = Math.atan2(y, x) * (180 / Math.PI);
          bearing = (bearing + 360) % 360; // Ensure the result is between 0 and 360 degrees

          response.push({ lat: ordinate[0], lng: ordinate[1], bearing:bearing });
        })
      );
    }

    return response;
    // Use the coordinates to display the route on a map
    // Example: displayRoute(decodedPath);
  }
}
