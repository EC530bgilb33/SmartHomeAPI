const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/addUser', userController.addUser);
router.get('/getAllUsers', userController.getAllUsers);
router.delete('/deleteUser', userController.deleteUser);
router.put('/updateUser', userController.updateUser);

module.exports = router;