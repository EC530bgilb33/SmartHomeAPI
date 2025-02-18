const userService = require('../services/userService')

const addUser = async (req, res) => {
    try {
        const result = await userService.addUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const updateUser = async (req, res) => {
    try {
        const result = await userService.updateUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

// HOUSE FUNCTIONS //

const addHouse = async (req, res) => {
    try {
        const result = await userService.addHouse(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const getHomesByUser = async (req, res) => {
    try {
        const result = await userService.getHomesByUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const deleteHouse = async (req, res) => {
    try {
        const result = await userService.deleteHouse(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const updateHouse = async (req, res) => {
    try {
        const result = await userService.updateHouse(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const addRoom = async (req, res) => {
    try {
        const result = await userService.addRoom(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const getRoomsByHouse = async (req, res) => {
    try {
        const result = await userService.getRoomsByHouse(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const updateRoom = async (req, res) => {
    try {
        const result = await userService.updateRoom(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}

const deleteRoom = async (req, res) => {
    try {
        const result = await userService.deleteRoom(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(result.status).json({response: result.response});
    }
}


module.exports = {
    addUser,
    getAllUsers,
    deleteUser,
    updateUser,
    addHouse,
    getHomesByUser,
    deleteHouse,
    updateHouse,
    addRoom,
    getRoomsByHouse,
    updateRoom,
    deleteRoom
}