import mongoose from "mongoose";

const mongoDbUri = process.env.MONGODB_URI;

if (!mongoDbUri) {
    throw new Error("MongoDb Uri Error!!");
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoDbUri).then((conn) => conn.connection)
    }

    try {
        const conn = await cached.promise
        return conn;


    } catch (error) {
        cached.promise = null;
        console.log('DB Connection Error : ', error);
    }
}

export default connectDB;
