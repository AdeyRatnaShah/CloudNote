const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/iNotebook"


const connectToMongo = async () =>{
    // try {
        
        await mongoose.connect(mongoURI)
        console.log("Database Connected succesfully")
    // } catch (error) {
    //     handleError(error);
    // }
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