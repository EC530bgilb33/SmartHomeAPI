const db = require('../config/db')

const addDevice = (deviceData) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO devices (RoomID, DeviceType) VALUES (?, ?)`;
        const params = [deviceData.RoomID, deviceData.DeviceType];

        db.run(query, params, function(err) {
            if (err) {
                console.error('Error adding device:', err.message);
                reject(err);
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
                console.error('Error fetching user devices:', err.message);
                reject(err);
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

module.exports = {
    addDevice,
    getDevicesByUser
}
