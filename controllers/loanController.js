const Loan = require('../models/loan');
const Member = require('../models/member');
const Book = require('../models/book');
//*
const getAll = async (req, res) => {
    try {
        const data = await Loan.find()
            .populate('member_id', 'fullName email phone') 
            .populate('items.book_id', 'title author category'); 
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const data = await Loan.findById(req.params.id)
            .populate('member_id', 'fullName email phone')
            .populate('items.book_id', 'title author category');
            
        if (!data) return res.status(404).json({ message: 'Không tìm thấy!' });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { member_id, items } = req.body;

        const member = await Member.findById(member_id);
        if (!member) {
            return res.status(404).json({ message: "Không tìm thấy thành viên!" });
        }
        if (member.isActive === false) {
            return res.status(400).json({ message: "Thẻ thành viên đang bị khóa, không thể mượn sách!" });
        }

        for (let item of items) {
            const book = await Book.findById(item.book_id);
            if (!book) {
                return res.status(404).json({ message: `Không tìm thấy sách có ID: ${item.book_id}` });
            }
            if (book.availableCopies < item.quantity) {
                return res.status(400).json({ message: `Sách "${book.title}" chỉ còn ${book.availableCopies} cuốn, không đủ để mượn ${item.quantity} cuốn!` });
            }
        }

        const newLoan = await Loan.create(req.body);

        for (let item of items) {
            await Book.findByIdAndUpdate(item.book_id, {
                $inc: { availableCopies: -item.quantity } 
            });
        }

        res.status(201).json(newLoan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getByMemberId = async (req, res) => {
    try {
        const data = await Loan.find({ member_id: req.params.memberId })
            .populate('member_id', 'fullName email')
            .populate('items.book_id', 'title');
            
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const returnBook = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Không tìm thấy phiếu mượn!' });
        }

        if (loan.status === 'Returned') {
            return res.status(400).json({ message: 'Phiếu mượn này đã được trả trước đó!' });
        }

        loan.returnDate = new Date();
        loan.status = 'Returned';
        await loan.save();

        for (let item of loan.items) {
            await Book.findByIdAndUpdate(item.book_id, {
                $inc: { availableCopies: item.quantity }
            });
        }

        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAll, getById, create, getByMemberId, returnBook };