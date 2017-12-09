const path = require('path');

const express = require('express');

const public_path = path.join(__dirname, '../public');

const PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static(public_path));

app.get('/', (req, res) => {
    res.send('App up and running');
});

app.listen(PORT, () => {
    console.log(`Express app started successfully on port ${PORT}`);
});