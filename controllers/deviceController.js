const deviceService = require('../services/deviceService')

const addDevice = async (req, res) => {
    try {
        const result = await deviceService.addDevice(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error adding device', error: error.message});
    }
}

const getDevicesByUser = async (req, res) => {
    try {
        const result = await deviceService.getDevicesByUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error getting user devices', error: error.message});
    }
}

module.exports = {
    addDevice,
    getDevicesByUser
}