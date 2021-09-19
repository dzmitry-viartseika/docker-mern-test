const express = require('express');
const { connectDb } = require('./helpers/db');
const { port, host, db, apiUrl } = require('./configuration');
const app = express();
const axios = require('axios');

const startServer = () => {
    app.listen(port, () => {
        console.log('Started auth service on port', port);
        console.log('Started api server on host', host);
        console.log('mongoo', db);
    })
}

app.get('/test', (req, res) => {
    res.send('Our AUTH server is working correctly');
})

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: '1234',
        email: 'foo@gmail.com'
    })
})

app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata').then((response) => {
        res.json({
            testapidata: response.data.testwithapi
        })
    })
})

connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once('open', startServer);