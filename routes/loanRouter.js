const express = require('express');
const router = express.Router();
const { getAll, getById, create, getByMemberId, returnBook } = require('../controllers/loanController');

router.get('/member/:memberId', getByMemberId);
router.put('/:id/return', returnBook);

router.route('/')
    .get(getAll)
    .post(create);

router.route('/:id')
    .get(getById);

module.exports = router;