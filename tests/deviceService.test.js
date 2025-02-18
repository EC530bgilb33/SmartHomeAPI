const db = require('../config/db');
const userService = require('../services/userService');
const deviceService = require('../services/deviceService');

beforeAll((done) => {
    db.run("PRAGMA foreign_keys = ON", done); // Ensures foreign key constraints
});

beforeEach(async () => {
    await new Promise((resolve, reject) => {
        db.run("BEGIN TRANSACTION", (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
});

afterEach(async () => {
    await new Promise((resolve, reject) => {
        db.run("ROLLBACK", (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
});

test('addDevice should insert a new device and return success', async () => {
    const mockUser = { Name: "Hank", Email: "hank@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "555 Smart St" });
    const houseID = addedHouse.response.data.id;

    const mockRoom = { HouseID: houseID, RoomType: "Living Room" };
    const addedRoom = await userService.addRoom(mockRoom);
    const roomID = addedRoom.response.data.id;

    const mockDevice = {RoomID: roomID, DeviceType: "Temp"};
    const result = await deviceService.addDevice(mockDevice);

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully added device");
    expect(result.response.data).toHaveProperty("id");
});

test('addDevice should fail if room does not exist', async () => {
    const mockDevice = { RoomID: 1, DeviceType: "Temp" };

    try {
        await deviceService.addDevice(mockDevice);
    } catch(result) {
        expect(result.status).toBe(500);
        expect(result.response.message).toBe("Error adding device");
        expect(result.response.error).toBe("SQLITE_CONSTRAINT: FOREIGN KEY constraint failed");
        return;
    }
    throw new Error("Expected an error but did not receive one");
});

test('addDevice should fail if missing input', async () => {
    const mockDevice = { DeviceID: 1, DeviceType: null };

    try {
        await deviceService.addDevice(mockDevice);
    } catch(result) {
        expect(result.status).toBe(400);
        expect(result.response.message).toBe("Error adding device");
        expect(result.response.error).toBe("Missing input");
        return;
    }
    throw new Error("Expected an error but did not receive one");
});

test('getDevicesByUser should return devices for a user', async () => {
    const mockUser = { Name: "Hank", Email: "hank@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "555 Smart St" });
    const houseID = addedHouse.response.data.id;

    const mockRoom = { HouseID: houseID, RoomType: "Living Room" };
    const addedRoom = await userService.addRoom(mockRoom);
    const roomID = addedRoom.response.data.id;

    const mockDevice = {RoomID: roomID, DeviceType: "Temp"};
    await deviceService.addDevice(mockDevice);

    const result = await deviceService.getDevicesByUser({ UserID: userID });

    expect(result.status).toBe(200);
    expect(Array.isArray(result.response.data)).toBe(true);
});

test('deleteDevice should delete a device and return success', async () => {
    const mockUser = { Name: "Hank", Email: "hank@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "555 Smart St" });
    const houseID = addedHouse.response.data.id;

    const mockRoom = { HouseID: houseID, RoomType: "Living Room" };
    const addedRoom = await userService.addRoom(mockRoom);
    const roomID = addedRoom.response.data.id;

    const mockDevice = {RoomID: roomID, DeviceType: "Temp"};
    const addedDevice = await deviceService.addDevice(mockDevice);
    const deviceID = addedDevice.response.data.id;

    const result = await deviceService.deleteDevice({ DeviceID: deviceID });

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully deleted device");
});

test('deleteDevice should fail if device does not exist', async () => {
    const result = await deviceService.deleteDevice({ DeviceID: 1 });

    expect(result.status).toBe(404);
    expect(result.response.message).toBe("Error deleting device");
    expect(result.response.error).toBe("Device does not exist");
});

test('updateRoom should update a room and return success', async () => {
    const mockUser = { Name: "Hank", Email: "hank@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "555 Smart St" });
    const houseID = addedHouse.response.data.id;

    const mockRoom = { HouseID: houseID, RoomType: "Living Room" };
    const addedRoom = await userService.addRoom(mockRoom);
    const roomID = addedRoom.response.data.id;

    const mockDevice = {RoomID: roomID, DeviceType: "Temp"};
    const addedDevice = await deviceService.addDevice(mockDevice);
    const deviceID = addedDevice.response.data.id;

    const updatedDeviceData = { DeviceID: deviceID, DeviceType: "Air Quality" };
    const result = await deviceService.updateDevice(updatedDeviceData);

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully updated device");
});

test('updateDevice should fail when device does not exist', async () => {
    const updateDeviceData = { DeviceID: 1, DeviceType: "Temp 2" };
    const result = await deviceService.updateDevice(updateDeviceData);

    expect(result.status).toBe(404);
    expect(result.response.message).toBe("Error updating device");
    expect(result.response.error).toBe("Device does not exist");
});