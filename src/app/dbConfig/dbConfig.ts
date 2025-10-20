import mongoose from "mongoose";
 

export async function connect() {
    try {
        // Check if already connected
        if (mongoose.connections[0].readyState) {
            console.log('Already connected to MongoDB');
            return;
        }

        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        await mongoose.connect(mongoUri);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('Error in MongoDB connection:', err);
            process.exit(1);
        });

    } catch (error) {
        console.log('Error connecting to database:', error);
        throw error; // Re-throw to handle in API route
    }
}