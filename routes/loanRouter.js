const express = require("express");
const Loan = require("../models/loan");

const loanRouter = express.Router();

// GET
loanRouter.get("/", async (req, res) => {
    try {
        const loans = await Loan.find();
        res.json(loans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST
loanRouter.post("/", async (req, res) => {
    try {
        const loan = new Loan(req.body);
        const savedLoan = await loan.save();

        res.status(201).json(savedLoan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET
loanRouter.get("/:id", async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found"
            });
        }

        res.json(loan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Lấy danh sách phiếu mượn theo memberId
loanRouter.get("/members/:memberId", async (req, res) => {
    try {
        const memberId = req.params.memberId;

        const loans = await Loan.find({
            member_id: memberId
        });

        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = loanRouter;
