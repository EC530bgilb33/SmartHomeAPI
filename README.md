# SmartHomeAPI

## Overview
SmartHomeAPI is a Node.js-based RESTful API that manages users, homes, rooms, and devices in a smart home environment. It uses **SQLite** for data storage and follows a structured approach with separate services, controllers, and a database configuration.

## Features
- **User Management**: Add, update, delete, and retrieve users.
- **Home Management**: Associate homes with users, update, and delete homes.
- **Room Management**: Assign rooms to homes and manage them.
- **Device Management**: Associate devices with rooms and manage them.
- **SQLite Database**: Local storage for smart home data.
- **Automated Testing**: Unit tests for API endpoints using **Jest**.
- **GitHub Actions**: Continuous integration for automated testing.

---

## Installation
### Prerequisites
- **Node.js** (Version 16+ recommended)
- **SQLite3**
- **Git**

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/SmartHomeAPI.git
   cd SmartHomeAPI
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

---

## Running the API
### Start the server
```sh
npm start
```
The API will be available at `http://localhost:3000/api`.

---

## API Endpoints

### **User Endpoints**
| Method | Endpoint         | Description              | Input Body |
|--------|----------------|--------------------------|-------------|
| POST   | /users/addUser      | Add a new user          | {Name, Email, Password} |
| GET    | /users/getAllUsers      | Get all users           | none |
| DELETE | /users/deleteUser   | Delete a user           | {UserID} |
| PUT    | /users/updateUser   | Update user information | {UserID} |

### **User Home Endpoints**
| Method | Endpoint         | Description              | Input Body |
|--------|----------------|--------------------------|--------------|
| POST   | /users/addHouse      | Add a new home          | {UserID, Address} |
| GET    | /users/getHomesByUser     | Get homes by user ID    | {UserID} |
| DELETE | /users/deleteHouse   | Delete a home           | {HouseID} |
| PUT    | /users/updateHouse   | Update home information | {HouseID} |

### **User Room Endpoints**
| Method | Endpoint         | Description              | Input Body |
|--------|----------------|--------------------------|--------------|
| POST   | /users/addRoom      | Add a new room          | {HouseID, RoomType} |
| GET    | /users/getRoomsByHouse    | Get rooms by house ID   | {HouseID} |
| DELETE | /users/deleteRoom   | Delete a room           | {RoomID} |
| PUT    | /users/updateRoom   | Update room information | {RoomID} |

### **Device Endpoints**
| Method | Endpoint         | Description              | Input Body |
|--------|----------------|--------------------------|--------------|
| POST   | /devices/addDevice    | Add a new device        | {RoomID, DeviceID} |
| GET    | /devices/getDevicesByUser   | Get devices by user ID  | {UserID} |
| DELETE | /devices/deleteDevice | Delete a device         | {DeviceID} |
| PUT    | /devices/updateDevice | Update device details   | {DeviceID} |

---

## Database Schema

The database schema consists of four tables: **users, homes, rooms, and devices**.

### **Users Table**
```sql
CREATE TABLE IF NOT EXISTS users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    Password TEXT NOT NULL
);
```
### **Homes Table**
```sql
CREATE TABLE IF NOT EXISTS homes (
    HouseID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    Address TEXT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
);
```
### **Rooms Table**
```sql
CREATE TABLE IF NOT EXISTS rooms (
    RoomID INTEGER PRIMARY KEY AUTOINCREMENT,
    HouseID INTEGER NOT NULL,
    RoomType TEXT NOT NULL,
    FOREIGN KEY (HouseID) REFERENCES homes(HouseID) ON DELETE CASCADE
);
```
### **Devices Table**
```sql
CREATE TABLE IF NOT EXISTS devices (
    DeviceID INTEGER PRIMARY KEY AUTOINCREMENT,
    RoomID INTEGER NOT NULL,
    DeviceType TEXT NOT NULL,
    FOREIGN KEY (RoomID) REFERENCES rooms(RoomID) ON DELETE CASCADE
);
```

---

## Running Unit Tests
Unit tests are implemented using **Jest**. To run the test suite, use:
```sh
npm test
```

---

## Continuous Integration with GitHub Actions
The project uses GitHub Actions to automate testing on each push. The workflow is defined in `.github/workflows/ci.yml`.

### **Workflow Steps:**
1. Checkout repository
2. Set up Node.js
3. Install dependencies
4. Initialize SQLite database
5. Run tests with Jest

