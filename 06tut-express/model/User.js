const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
  username:{
    type: String,
    required: true
  },

  roles:{
    User: {
      type: Number,
      default: 2001
    },
    Editor: Number,
    Admin: Number
  },

  password:{
    type: String,
    required: true
  },

  refreshToken: String
});

const User = mongoose.model("User", userSchema)


module.exports = User