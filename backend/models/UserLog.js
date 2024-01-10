const mongoose = require("mongoose");

const userLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  action: {
    type: String,
    enum: [
      "login",
      "signup",
      "Get_all_Shopify_Data",
      "Updated_Product",
      "Deleted_Product",
      "Added_New_Product",
    ],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  productId: { type: String },
  username: { type: String },
});

const UserLog = mongoose.model("Ishwar_logs", userLogSchema);

module.exports = UserLog;
