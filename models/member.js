const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const memberSchema = new Schema({
    _id: { 
        type: String, 
        default: () => new mongoose.Types.ObjectId().toString() 
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    membershipType: {
        type: String,
        enum: ["Student", "Teacher", "Guest"],
        required: true
    },
    isActive: { type: Boolean, default: true }
}, { 
    timestamps: true 
});

const Member = model('Member', memberSchema);
module.exports = Member;