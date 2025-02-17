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


module.exports = {
    addUser,
    getAllUsers,
    deleteUser,
    updateUser
}