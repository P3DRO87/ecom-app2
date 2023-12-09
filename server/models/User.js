const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      google: { type: Boolean },
      password: { type: String, required: true },
      role: {
         type: String,
         enum: {
            values: ["admin", "client"],
            message: "{VALUE} is not a valid role",
            default: "client",
            required: true,
         },
         required: true,
      },
   },
   { timestamps: true }
);

module.exports = model("users", UserSchema);
