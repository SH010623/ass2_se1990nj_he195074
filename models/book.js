const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        _id: {
            type: String
        },
        title: {
            type: String,
            required: true,
            minlength: 2
        },
        author: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
        },
        publishedYear: {
            type: Number,
            required: true
        },
        totalCopies: {
            type: Number,
            required: true,
            min: 0
        },
        availableCopies: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        collection: "books",
        timestamps: true
    }
);

module.exports = mongoose.model("Books", bookSchema);