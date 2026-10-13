const express = require("express");
const Member = require("../models/member");

const memberRouter = express.Router();

// GET
memberRouter.get("/", async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST
memberRouter.post("/", async (req, res) => {
    try {
        const member = new Member(req.body);
        const savedMember = await member.save();

        res.status(201).json(savedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET
memberRouter.get("/:id", async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.json(member);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT
memberRouter.put("/:id", async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.json(member);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE
memberRouter.delete("/:id", async (req, res) => {
    try {
        const member = await Member.findByIdAndDelete(
            req.params.id
        );

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.status(200).json({
            message: "Member deleted successfully"
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = memberRouter;
