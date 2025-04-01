
const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI;

console.log("MONGO_URI:", process.env.MONGO_URI); 
const connectToMongo = async () =>{
    // try {
        
        // await mongoose.connect(mongoURI)
        // console.log("Database Connected succesfully")
    // } catch (error) {
    //     handleError(error);
    // }
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process if connection fails
    }
};
// const handleError = (error) => {
//     if (error.name === 'MongoServerError' && error.code === 11000) {
//         console.error('MongoDB Duplicate Key Error:', error.message);
//         // Handle duplicate key error (e.g., log, notify user, retry operation)
//     } else {
//         console.error('MongoDB Connection Error:', error.message);
//         // Handle other MongoDB connection errors
//     }
// };



module.exports = connectToMongo;