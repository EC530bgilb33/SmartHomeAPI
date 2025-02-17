const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const userRoutes = require('../routes/userRoutes');
const deviceRoutes = require('../routes/deviceRoutes')

app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes)

app.get('/', (req, res) => {
    res.send('Hello, your server is running!');
});

const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});