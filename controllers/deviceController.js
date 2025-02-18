const deviceService = require('../services/deviceService')

const addDevice = async (req, res) => {
    try {
        const result = await deviceService.addDevice(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const getDevicesByUser = async (req, res) => {
    try {
        const result = await deviceService.getDevicesByUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const updateDevice = async (req, res) => {
    try {
        const result = await deviceService.updateDevice(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const deleteDevice = async (req, res) => {
    try {
        const result = await deviceService.deleteDevice(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

module.exports = {
    addDevice,
    getDevicesByUser,
    updateDevice,
    deleteDevice
}