import mongoose, { Document, Schema, Model } from 'mongoose';
import connectDB from '../config/databaseConnect';
import { IVehicleData } from './vehicle.model';

// Connect to MongoDB
connectDB();

// Define interface for VehicleMaintenanceRecord
export interface IVehicleMaintenanceRecord extends Document {
    date: Date;
    milage: number;
    reportOfWorkPerformed: string;
    costs: number;
    notes: string;
    vehicle:IVehicleData;
}

// Define schema for VehicleMaintenanceRecord
const VehicleMaintenanceRecordSchema: Schema = new Schema({
    date: { type: Date, default: Date.now},
    milage: { type: Number, required: true },
    reportOfWorkPerformed: { type: String, required: true },
    costs: { type: Number, required: true },
    notes: { type: String },
    vehicle:  { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true } // Reference to Vehicle model
});

// Create and export mongoose model for VehicleMaintenanceRecord
const VehicleMaintenanceRecordModel: Model<IVehicleMaintenanceRecord> = mongoose.model<IVehicleMaintenanceRecord>('VehicleMaintenanceRecord', VehicleMaintenanceRecordSchema);

export default VehicleMaintenanceRecordModel;