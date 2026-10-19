const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const loanSchema = new Schema({
    _id: { 
        type: String, 
        default: () => new mongoose.Types.ObjectId().toString() 
    },
    member_id: {
        type: String,
        ref: "Member",
        required: true
    },
    items: [{
        _id: false,
        book_id: {
            type: String,
            ref: "Book",
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            required: true
        }
    }],
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date, default: null },
    status: {
        type: String,
        enum: ["Borrowing", "Returned", "Overdue"],
        default: "Borrowing"
    }
}, {
    timestamps: true
});

module.exports = model('Loan', loanSchema);