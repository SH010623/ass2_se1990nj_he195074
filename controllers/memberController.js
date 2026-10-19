const Member = require('../models/member');

const getAll = async (req, res) => {
    try {
        const data = await Member.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const data = await Member.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Không tìm thấy!' });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newData = await Member.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedData = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedData) return res.status(404).json({ message: 'Không tìm thấy!' });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const deletedData = await Member.findByIdAndDelete(req.params.id);
        if (!deletedData) return res.status(404).json({ message: 'Không tìm thấy!' });
        res.status(200).json({ message: 'Xóa thành công!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAll, getById, create, update, remove };