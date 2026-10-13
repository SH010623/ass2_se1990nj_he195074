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
        items: [
            {
                book_id: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        borrowDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        returnDate: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: ["Borrowing", "Returned", "Overdue"],
            default: "Borrowing"
        }        
    },
    {
        collection: "loans",
        timestamps: true
    }
);

module.exports = mongoose.model("Loans", loanSchema);