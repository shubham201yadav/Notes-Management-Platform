const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser, updateUserRole } = require('../controllers/usersController');

// Public for now — consider adding admin auth middleware later
router.post('/', createUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.patch('/:id/role', updateUserRole);

module.exports = router;
