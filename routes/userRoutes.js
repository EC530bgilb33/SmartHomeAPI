const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/addUser', userController.addUser);
router.get('/getAllUsers', userController.getAllUsers);
router.delete('/deleteUser', userController.deleteUser);
router.put('/updateUser', userController.updateUser);

// HOUSE ROUTES //

router.post('/addHouse', userController.addHouse);
router.get('/getHomesByUser', userController.getHomesByUser);
router.delete('/deleteHouse', userController.deleteHouse);
router.put('/updateHouse', userController.updateHouse);

// ROOM ROUTES //

router.post('/addRoom', userController.addRoom);
router.get('/getRoomsByHouse', userController.getRoomsByHouse);
router.delete('/deleteRoom', userController.deleteRoom);
router.put('/updateRoom', userController.updateRoom);


module.exports = router;