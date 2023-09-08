// Database config file
// Require the use of mongoose
const mongoose = require('mongoose')

// Declare an async function called connectDB
const connectDB = async () => {
  // Try/ Catch
  try {
    // Declare a variable called con which awaits the promise from mongoose connecting to the DB_STRING variable within the .env file
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    // Console log connection is successful
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    // Console log the error in the catch
    console.error(err)
    process.exit(1)
  }
}

// Export the connectDB function to be used elsewhere
module.exports = connectDB
