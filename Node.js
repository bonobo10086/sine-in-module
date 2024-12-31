const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let signInData = [];

// Middleware to parse JSON
app.use(express.json());

// Endpoint for signing in
app.post('/signIn', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const signInTime = new Date().toISOString();
    const record = { ip: userIP, time: signInTime };

    signInData.push(record);
    res.json({ message: '签到成功！', data: record });
});

// Endpoint to get statistics
app.get('/statistics', (req, res) => {
    res.json(signInData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
