const express = require('express');
const mongoose = require('mongoose');
const { connectDb } = require('./helpers/db');
const { port, host, db } = require('./configuration');
const app = express();

const postSchema = new mongoose.Schema({
    name: String,
})

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log('Started api server on port', port);
        console.log('Started api server on host', host);
        console.log('mongoo', db);
    })

    const silence = new Post({
        name: 'silence'
    })
    silence.save((err, saved) => {
        if (err) return console.error(err);
        console.log('saved', saved);
    })
    console.log('silence', silence)
    // Post.find((err, post) => {
    //     if (err) return console.error(err);
    //     console.log('post', post)
    // })
}

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly');
})

connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once('open', startServer);