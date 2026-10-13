const express = require("express");
const Book = require("../models/book");

const bookRouter = express.Router();

// GET: 
bookRouter.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: 
bookRouter.post("/", async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();

        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: 
bookRouter.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT:
bookRouter.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: 
bookRouter.delete("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(
            req.params.id
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = bookRouter;
