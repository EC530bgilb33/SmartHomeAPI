const db = require('../config/db');
const userService = require('../services/userService');

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


// ADD USER UNIT TESTS //

test('addUser should insert a new user and return success', async () => {
    const mockUser = { Name: "Alice", Email: "alice@example.com", Password: "password123" };
    const result = await userService.addUser(mockUser);

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully added User");
    expect(result.response.data).toHaveProperty("id");

});

test('addUser should return an error when same email is added more than once', async () => {
    const mockUser = { Name: "Alice", Email: "alice@example.com", Password: "password123" };
    await userService.addUser(mockUser);

    try {
        await userService.addUser(mockUser);
    } catch (result) {
        expect(result.status).toBe(500);
        expect(result.response.message).toBe("Error adding user");
        expect(result.response.error).toBe("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.Email");
        return;
    }

    throw new Error("Expected an error but did not receive one");
});

test('addUser should return an error when an input field is missing', async () => {
    const mockUser = { Name: "Alice", Email: "alice@example.com", Password: null };
    try {
        result = await userService.addUser(mockUser);
    } catch (result) {
        expect(result.status).toBe(400);
        expect(result.response.message).toBe("Error adding user");
        expect(result.response.error).toBe("Missing input");
        return;
    }

    throw new Error("Expected an error but did not receive one");
});


test('getAllUsers should return all users', async () => {
    const result = await userService.getAllUsers();

    expect(result.status).toBe(200);
    expect(Array.isArray(result.response.data)).toBe(true);
});

test('deleteUser should delete a user and return success', async () => {
    const mockUser = { Name: "Bob", Email: "bob@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const result = await userService.deleteUser({ userID });

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully deleted User");
});

test('deleteUser should fail whe user does not exist', async () => {
    const mockUser = { Name: "Bob", Email: "bob@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const result = await userService.deleteUser({ userID: userID + 1 });

    expect(result.status).toBe(404);
    expect(result.response.message).toBe("Error deleting user");
    expect(result.response.error).toBe("User not found");
});

test('updateUser should update a user and return success', async () => {
    const mockUser = { Name: "Charlie", Email: "charlie@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const updatedData = { userID, Name: "Charlie Updated", Email: "charlieupdated@example.com", Password: "newpassword" };
    const result = await userService.updateUser(updatedData);

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully updated User");
});

test('updateUser should have an error when user not found', async () => {
    const mockUser = { Name: "Charlie", Email: "charlie@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const updatedData = { UserID: userID + 1, Name: "Charlie Updated", Email: "charlieupdated@example.com", Password: "newpassword" };
    const result = await userService.updateUser(updatedData);

    expect(result.status).toBe(404);
    expect(result.response.message).toBe("User not found");
});

// HOUSE UNIT TESTS //

test('addHouse should insert a new house and return success', async () => {
    const mockUser = { Name: "Dave", Email: "dave@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const mockHouse = { UserID: userID, Address: "123 Smart Ave" };
    const result = await userService.addHouse(mockHouse);

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully added House");
    expect(result.response.data).toHaveProperty("id");
});

test('addHouse should fail if user does not exist', async () => {
    const mockHouse = { UserID: 1, Address: "123 Smart Ave" };

    try {
        await userService.addHouse(mockHouse);
    } catch(result) {
        expect(result.status).toBe(500);
        expect(result.response.message).toBe("Error adding house");
        expect(result.response.error).toBe("SQLITE_CONSTRAINT: FOREIGN KEY constraint failed");
        return;
    }
    throw new Error("Expected an error but did not receive one");
});

test('addHouse should fail if missing input', async () => {
    const mockHouse = { UserID: 1, Address: null };

    try {
        await userService.addHouse(mockHouse);
    } catch(result) {
        expect(result.status).toBe(400);
        expect(result.response.message).toBe("Error adding house");
        expect(result.response.error).toBe("Missing input");
        return;
    }
    throw new Error("Expected an error but did not receive one");
});

test('getHomesByUser should return houses for a user', async () => {
    const mockUser = { Name: "Eve", Email: "eve@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    await userService.addHouse({ UserID: userID, Address: "456 Future Blvd" });

    const result = await userService.getHomesByUser({ UserID: userID });

    expect(result.status).toBe(200);
    expect(Array.isArray(result.response.data)).toBe(true);
});

test('deleteHouse should delete a house and return success', async () => {
    const mockUser = { Name: "Frank", Email: "frank@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "789 Tech St" });
    const houseID = addedHouse.response.data.id;

    const result = await userService.deleteHouse({ HouseID: houseID });

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully deleted House");
});

test('deleteHouse should fail if house does not exist', async () => {
    const result = await userService.deleteHouse({ HouseID: 1 });

    expect(result.status).toBe(404);
    expect(result.response.message).toBe("Error deleting house");
    expect(result.response.error).toBe("House does not exist");
});

test('updateHouse should update a house and return success', async () => {
    const mockUser = { Name: "Grace", Email: "grace@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "321 Smart Ave" });
    const houseID = addedHouse.response.data.id;

    const updatedHouseData = { HouseID: houseID, Address: "New Address 123" };
    const result = await userService.updateHouse(updatedHouseData);

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully updated House");
});

test('updateHouse should fail when house doees not exist', async () => {
    const updatedHouseData = { HouseID: 1, Address: "New Address 123" };
    const result = await userService.updateHouse(updatedHouseData);

    expect(result.status).toBe(404);
    expect(result.response.message).toBe("Error updating house");
    expect(result.response.error).toBe("House does not exist");
});

// ROOM UNIT TESTS //

test('addRoom should insert a new room and return success', async () => {
    const mockUser = { Name: "Hank", Email: "hank@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "555 Smart St" });
    const houseID = addedHouse.response.data.id;

    const mockRoom = { HouseID: houseID, RoomType: "Living Room" };
    const result = await userService.addRoom(mockRoom);

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully added Room");
    expect(result.response.data).toHaveProperty("id");
});

test('addRoom should fail if house does not exist', async () => {
    const mockRoom = { HouseID: 1, RoomType: "Bedroom" };

    try {
        await userService.addRoom(mockRoom);
    } catch(result) {
        expect(result.status).toBe(500);
        expect(result.response.message).toBe("Error adding room");
        expect(result.response.error).toBe("SQLITE_CONSTRAINT: FOREIGN KEY constraint failed");
        return;
    }
    throw new Error("Expected an error but did not receive one");
});

test('addRoom should fail if missing input', async () => {
    const mockRoom = { HouseID: 1, RoomType: null };

    try {
        await userService.addRoom(mockRoom);
    } catch(result) {
        expect(result.status).toBe(400);
        expect(result.response.message).toBe("Error adding room");
        expect(result.response.error).toBe("Missing input");
        return;
    }
    throw new Error("Expected an error but did not receive one");
});

test('getRoomsByHouse should return rooms for a house', async () => {
    const mockUser = { Name: "Ivy", Email: "ivy@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "777 Tech Ave" });
    const houseID = addedHouse.response.data.id;

    await userService.addRoom({ HouseID: houseID, RoomType: "Bedroom" });

    const result = await userService.getRoomsByHouse({ HouseID: houseID });

    expect(result.status).toBe(200);
    expect(Array.isArray(result.response.data)).toBe(true);
});

test('deleteRoom should delete a room and return success', async () => {
    const mockUser = { Name: "Jack", Email: "jack@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "888 Future St" });
    const houseID = addedHouse.response.data.id;

    const addedRoom = await userService.addRoom({ HouseID: houseID, RoomType: "Office" });
    const roomID = addedRoom.response.data.id;

    const result = await userService.deleteRoom({ RoomID: roomID });

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully deleted Room");
});

test('deleteRoom should fail if room does not exist', async () => {
    const result = await userService.deleteRoom({ RoomID: 1 });

    expect(result.status).toBe(404);
    expect(result.response.message).toBe("Error deleting room");
    expect(result.response.error).toBe("Room does not exist");
});

test('updateRoom should update a room and return success', async () => {
    const mockUser = { Name: "Kevin", Email: "kevin@example.com", Password: "password123" };
    const addedUser = await userService.addUser(mockUser);
    const userID = addedUser.response.data.id;

    const addedHouse = await userService.addHouse({ UserID: userID, Address: "999 AI Blvd" });
    const houseID = addedHouse.response.data.id;

    const addedRoom = await userService.addRoom({ HouseID: houseID, RoomType: "Kitchen" });
    const roomID = addedRoom.response.data.id;

    const updatedRoomData = { RoomID: roomID, RoomType: "Updated Kitchen" };
    const result = await userService.updateRoom(updatedRoomData);

    expect(result.status).toBe(200);
    expect(result.response.message).toBe("Successfully updated Room");
});

test('updateRoom should fail when house doees not exist', async () => {
    const updateRoomData = { RoomID: 1, RoomType: "Bedroom" };
    const result = await userService.updateRoom(updateRoomData);

    expect(result.status).toBe(404);
    expect(result.response.message).toBe("Error updating room");
    expect(result.response.error).toBe("Room does not exist");
});
