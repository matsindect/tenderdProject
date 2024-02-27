import mongoose, { Document, Schema, Model } from 'mongoose';
import connectDB from '../config/databaseConnect';

// Connect to MongoDB
connectDB();

// Define GPS data schema
export interface IGPSData extends Document {
    latitude: number;
    longitude: number;
    speed: number;
    timestamp: number;
}

const GPSSchema: Schema = new Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: { type: Number, required: true },
    timestamp: { type: Number, required: true }
});

const GPSModel : Model<IGPSData> = mongoose.model<IGPSData>('GPSData', GPSSchema);

export default GPSModel;
