import mongoose, { Document, Model, Schema } from 'mongoose';

// Define interface for IoTDevice
export interface IIoTDevice extends Document {
    deviceId: string;
    isActive: boolean;
}

// Define schema for IoTDevice
const IoTDeviceSchema: Schema = new Schema({
    deviceId: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: false }
});

// Create and export mongoose model for IoTDevice
const IoTDeviceModel: Model<IIoTDevice> = mongoose.model<IIoTDevice>('IoTDevice', IoTDeviceSchema);

export default IoTDeviceModel