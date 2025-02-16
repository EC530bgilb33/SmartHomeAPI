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

module.exports = {
    addUser
}