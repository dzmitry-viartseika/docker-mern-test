const express = require('express');
const { connectDb } = require('./helpers/db');
const { port, host, db } = require('./configuration');
const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log('Started auth service on port', port);
        console.log('Started api server on host', host);
        console.log('mongoo', db);
    })
}

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: '1234',
        email: 'foo@gmail.com'
    })
})

connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once('open', startServer);