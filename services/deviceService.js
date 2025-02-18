const db = require('../config/db')

const addDevice = (deviceData) => {
    return new Promise((resolve, reject) => {

        if (!deviceData.RoomID || !deviceData.DeviceType) {
            return reject({
                status: 400,
                response: {
                    message: "Error adding device",
                    error: "Missing input"
                }
            })
        }

        const query = `INSERT INTO devices (RoomID, DeviceType) VALUES (?, ?)`;
        const params = [deviceData.RoomID, deviceData.DeviceType];

        db.run(query, params, function(err) {
            if (err) {
                return reject({
                    status: 500,
                    response: {
                        message: "Error adding device",
                        error: err.message
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully added device",
                        data: {
                            id: this.lastID
                        }
                    }
                });
            }
        });
    });
};

const getDevicesByUser = (deviceData) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                d.DeviceID, d.DeviceType, 
                r.RoomID, r.RoomType, 
                h.HouseID, h.Address 
            FROM devices d
            JOIN rooms r ON d.RoomID = r.RoomID
            JOIN homes h ON r.HouseID = h.HouseID
            WHERE h.UserID = ?
        `;
        
        db.all(query, [deviceData.UserID], (err, rows) => {
            if (err) {
                return reject({
                    status: 500,
                    response: {
                        message: "Error fetching devices",
                        error: err.message
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully fetched all devices for user.",
                        data: rows
                    }
                });
            }
        });
    });
};

const updateDevice = (deviceData) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE devices SET DeviceType = ? WHERE DeviceID = ?`;
        const params = [deviceData.DeviceType, deviceData.DeviceID];

        db.run(query, params, function(err) {
            if (err) {
                if (err) {
                    return reject({
                        status: 500,
                        response: {
                            message: "Error updating device",
                            error: err.message
                        }
                    });
                }
            } else if (this.changes === 0) {
                resolve({
                    status: 404,
                    response: {
                        message: "Error updating device",
                        error: "Device does not exist"
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully updated device",
                        data: { 
                            DeviceID: deviceData.DeviceID,
                            DeviceType: deviceData.DeviceType
                         }
                    }
                });
            }
        });
    });
}; 

const deleteDevice = (deviceData) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM devices WHERE DeviceID = ?`;
        db.run(query, [deviceData.DeviceID], function(err) {
            if (err) {
                if (err) {
                    return reject({
                        status: 500,
                        response: {
                            message: "Error deleting device",
                            error: err.message
                        }
                    });
                }
            } else if (this.changes === 0) {
                resolve({
                    status: 404,
                    response: {
                        message: "Error deleting device",
                        error: "Device does not exist"
                    }
                });
            } else {
                resolve({
                    status: 200,
                    response: {
                        message: "Successfully deleted device",
                        data: { "DeviceID": deviceData.DeviceID }
                    }
                });
            }
        });
    });
};

module.exports = {
    addDevice,
    getDevicesByUser,
    updateDevice,
    deleteDevice
}
