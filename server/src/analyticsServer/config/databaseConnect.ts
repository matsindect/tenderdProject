import mongoose from 'mongoose';

// MongoDB configuration
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/vts_database', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as any);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;