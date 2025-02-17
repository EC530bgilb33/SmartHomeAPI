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

// HOME FUNCTIONS //

const addHouse = (houseData) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO homes (UserID, Address) VALUES (?, ?)`;
        const params = [houseData.UserID, houseData.Address];

        db.run(query, params, function(err) {
            if (err) {
                console.error('Error adding house:', err.message);
                reject(err);
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully added House",
                        data: {
                            id: this.lastID
                        }
                    }
                });
            }
        });
    });
};

const getHomesByUser = (houseData) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM homes WHERE UserID = ?`;
      db.all(query, [houseData.UserID], (err, rows) => {
        if (err) {
          console.error('Error fetching user homes:', err.message);
          reject(err);
        } else {
          resolve({
            status: 200,
            response: {
              message: "Successfully fetched all houses for user.",
              data: rows
            }
        });
        }
      });
    });
  };


  const deleteHouse = (houseData) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM homes WHERE HouseID = ?`;
        db.run(query, [houseData.HouseID], function(err) {
            if (err) {
                console.error('Error deleting house:', err.message);
                reject(err);
            } else if (this.changes === 0) {
                // If no rows were affected, the house doesn't exist
                resolve({
                    status: 404,
                    response: {
                        message: "House not found"
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully deleted House",
                        data: { "HouseID": houseData.HouseID }
                    }
                });
            }
        });
    });
};

const updateHouse = (houseData) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE homes SET Address = ? WHERE HouseID = ?`;
        const params = [houseData.Address, houseData.HouseID];

        db.run(query, params, function(err) {
            if (err) {
                console.error('Error updating house:', err.message);
                reject(err);
            } else if (this.changes === 0) {
                resolve({
                    status: 404,
                    response: {
                        message: "House not found",
                        data: { HouseID: houseData.HouseID }
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully updated House",
                        data: { 
                            HouseID: houseData.HouseID,
                            Address: houseData.Address
                         }
                    }
                });
            }
        });
    });
};

// Room Functions //

const addRoom = (roomData) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO rooms (HouseID, RoomType) VALUES (?, ?)`;
        const params = [roomData.HouseID, roomData.RoomType];

        db.run(query, params, function(err) {
            if (err) {
                console.error('Error adding room:', err.message);
                reject(err);
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully added Room",
                        data: {
                            id: this.lastID
                        }
                    }
                });
            }
        });
    });
};

const getRoomsByHouse = (roomData) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM rooms WHERE HouseID = ?`;
      db.all(query, [roomData.HouseID], (err, rows) => {
        if (err) {
          console.error('Error fetching house rooms:', err.message);
          reject(err);
        } else {
          resolve({
            status: 200,
            response: {
              message: "Successfully fetched all rooms for house.",
              data: rows
            }
        });
        }
      });
    });
  };

  const updateRoom = (roomData) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE rooms SET RoomType = ? WHERE RoomID = ?`;
        const params = [roomData.RoomType, roomData.RoomID];

        db.run(query, params, function(err) {
            if (err) {
                console.error('Error updating room:', err.message);
                reject(err);
            } else if (this.changes === 0) {
                resolve({
                    status: 404,
                    response: {
                        message: "Room not found",
                        data: { RoomID: roomData.RoomID }
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully updated Room",
                        data: { 
                            RoomID: roomData.RoomID,
                            RoomType: roomData.RoomType
                         }
                    }
                });
            }
        });
    });
};  

const deleteRoom = (roomData) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM rooms WHERE RoomID = ?`;
        db.run(query, [roomData.RoomID], function(err) {
            if (err) {
                console.error('Error deleting room:', err.message);
                reject(err);
            } else if (this.changes === 0) {
                // If no rows were affected, the room doesn't exist
                resolve({
                    status: 404,
                    response: {
                        message: "Room not found"
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully deleted Room",
                        data: { "RoomID": roomData.RoomID }
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