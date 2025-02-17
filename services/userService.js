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

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users`;
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error('Error fetching users:', err.message);
          reject(err);
        } else {
          resolve({
            status: 200,
            response: {
              message: "Successfully fetched all users.",
              data: rows
            }
        });
        }
      });
    });
  };


const deleteUser = (userData) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM users WHERE UserID = ?`;
        db.run(query, [userData.userID], function(err) {
            if (err) {
                console.error('Error deleting user:', err.message);
                reject(err);
            } else if (this.changes === 0) {
                // If no rows were affected, the user doesn't exist
                resolve({
                    status: 404,
                    response: {
                        message: "User not found"
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully deleted User",
                        data: { "userID": userData.userID }
                    }
                });
            }
        });
    });
};

const updateUser = (userData) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE users SET Name = ?, Email = ?, Password = ? WHERE UserID = ?`;
        const params = [userData.Name, userData.Email, userData.Password, userData.userID];

        db.run(query, params, function(err) {
            if (err) {
                console.error('Error updating user:', err.message);
                reject(err);
            } else if (this.changes === 0) {
                resolve({
                    status: 404,
                    response: {
                        message: "User not found",
                        data: { userID: userData.userID }
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully updated User",
                        data: { 
                            userID: userData.userID,
                            Name: userData.Name,
                            Email: userData.Email,
                            Password: userData.Password
                         }
                    }
                });
            }
        });
    });
};

module.exports = {
    addUser,
    getAllUsers,
    deleteUser,
    updateUser
}