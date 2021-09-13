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

app.get('/test', (req, res) => {
    res.send('Our auth service is working correctly');
})

connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once('open', startServer);