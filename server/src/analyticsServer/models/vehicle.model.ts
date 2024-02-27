import mongoose, { Document, Schema, Model } from 'mongoose';
import connectDB from '../config/databaseConnect';
import { IIoTDevice } from './iotDevice.model';

// Connect to MongoDB
connectDB();
export enum VehicleStatus {
    Active = "Active",
    Inactive = "Inactive",
    Maintenance = "Maintenance"
}
// Define Vehicle data schema
export interface IVehicleData extends Document {
    regNumber: string;
    vehicleModel: string;
    type: string;
    status: VehicleStatus;
    iotDevice:IIoTDevice
}
export interface LatLng {
    lat: number;
    lng: number;
}

const VehicleSchema: Schema = new Schema({
    regNumber: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    type: { type: String, required: true },
    iotDevice:{ type: Schema.Types.ObjectId, ref: 'IoTDevice', required: true }, // Reference to Vehicle model
    status: {type:String, enum: ['Active', 'Maintenance', 'Inactive'], default: 'Active', required: true }
});

const VehicleModel : Model<IVehicleData> = mongoose.model<IVehicleData>('Vehicle', VehicleSchema);

export default VehicleModel;