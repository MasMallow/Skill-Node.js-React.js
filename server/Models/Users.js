const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName: String,
        password: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
