import mongoose from 'mongoose';

// specifing the type of the object
// ? means optional the data my or may not be there
type ConnectionObject = {
    isConnected?: number;
}


const connection: ConnectionObject = {

}

// void means dont care about the type of return 
async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log('Using existing connection');
        return;
    }
    // if the connection is not there then we will create a new connection
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!);
        connection.isConnected = db.connections[0].readyState;
        console.log('New connection created and connected ');
    } catch (error) {
        console.log('Error while connecting to the database');
        process.exit(1);
    }
}

export default dbConnect;