import mongoose, { Document, Model, Schema } from 'mongoose';
import { IIoTDevice } from './iotDevice.model';

// Define interface for Routes
export interface IRoutes extends Document {
    deviceId: IIoTDevice;
    assigned: boolean;
}

// Define schema for Routes
const RoutesSchema: Schema = new Schema({
    deviceId: { type: Schema.Types.ObjectId, ref: 'IoTDevice', required: true },
    assigned: { type: Boolean, required: true, default: false },
    origin:{ type: String, required: true},
    destination:{ type: String, required: true}
});

// Create and export mongoose model for Routes
const RoutesModel: Model<IRoutes> = mongoose.model<IRoutes>('Routes', RoutesSchema);

export default RoutesModel