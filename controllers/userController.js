const userService = require('../services/userService')

const addUser = async (req, res) => {
    try {
        const result = await userService.addUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error adding user', error: error.message});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error getting all users', error: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error deleting user', error: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const result = await userService.updateUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error updating user', error: error.message});
    }
}

// HOUSE FUNCTIONS //

const addHouse = async (req, res) => {
    try {
        const result = await userService.addHouse(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error adding house', error: error.message});
    }
}

const getHomesByUser = async (req, res) => {
    try {
        const result = await userService.getHomesByUser(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error getting user homes', error: error.message});
    }
}

const deleteHouse = async (req, res) => {
    try {
        const result = await userService.deleteHouse(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error deleting house', error: error.message});
    }
}

const updateHouse = async (req, res) => {
    try {
        const result = await userService.updateHouse(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error updating house', error: error.message});
    }
}

const addRoom = async (req, res) => {
    try {
        const result = await userService.addRoom(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error adding room', error: error.message});
    }
}

const getRoomsByHouse = async (req, res) => {
    try {
        const result = await userService.getRoomsByHouse(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error getting rooms for house', error: error.message});
    }
}

const updateRoom = async (req, res) => {
    try {
        const result = await userService.updateRoom(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error updating room', error: error.message});
    }
}

const deleteRoom = async (req, res) => {
    try {
        const result = await userService.deleteRoom(req.body);
        res.status(result.status).json({ response: result.response });
        console.log(result.response.message);
    } catch (error) {
        res.status(500).json({message: 'Error deleting room', error: error.message});
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