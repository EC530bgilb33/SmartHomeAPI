const db = require('../config/db')

const addUser = (userData) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users (Name, Email, Password) VALUES (?, ?, ?)`;
        const params = [userData.Name, userData.Email, userData.Password];

        db.run(query, params, function(err) {
            if (err) {
                console.error('Error adding user:', err.message);
                reject(err);
            }
            else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully added User",
                        data: {
                            id: this.lastID
                        }
                    }
                });
            }
        });
    });
};

module.exports = {
    addUser
}