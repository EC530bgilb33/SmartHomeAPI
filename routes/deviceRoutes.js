const express = require('express')
const router = express.Router()
const deviceController = require('../controllers/deviceController')

router.post('/addDevice', deviceController.addDevice);
router.get('/getDevicesByUser', deviceController.getDevicesByUser);
router.put('/updateDevice', deviceController.updateDevice);
router.delete('/deleteDevice', deviceController.deleteDevice);

module.exports = router;