const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URI = process.env.DATABASE_URI

const connectDB = async () =>{

  const conn_configs = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }

  try{
    await mongoose.connect(DATABASE_URI);
  } catch (err){
    console.error(err);
  }

}


module.exports = connectDB
