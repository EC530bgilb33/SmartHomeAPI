const express = require('express')
const router = express.Router()
const deviceController = require('../controllers/deviceController')

router.post('/addDevice', deviceController.addDevice);
router.get('/getDevicesByUser', deviceController.getDevicesByUser);

module.exports = router;