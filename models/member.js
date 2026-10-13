const mongoose = require("mongoose");

const { Schema } = mongoose;

const memberSchema = new Schema(
    {
        _id: {
            type: String
        },
        fullName: {
            type: String,
            required: true,
            minlength: 2
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        membershipType: {
            type: String,
            required: true,
            enum: ["Student", "Teacher", "Guest"]
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        collection: "members",
        timestamps: true
    }
);

// // Khởi tạo model Member (hỗ trợ cả ref "Member" và "Members")
// const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);
// if (!mongoose.models.Members) {
//     mongoose.model("Members", memberSchema);
// }

module.exports = mongoose.model("Members", memberSchema);