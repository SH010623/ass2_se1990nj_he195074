const mongoose = require("mongoose");

const { Schema } = mongoose;

const loanSchema = new Schema(
    {
        _id: {
            type: String
        },
        member_id: {
            type: String
        },
        items: {
            type: String,
            required: true,
            minlength: 2
        },
        borrowDate: {
            type: String,
            required: true
        },
        dueDate: {
            type: String,
            required: true
        },
        returnDate: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["Returned", "Borrowing", "Overdue"]
        }        
    },
    {
        collection: "loans",
        timestamps: true
    }
);

module.exports = mongoose.model("Loans", loanSchema);