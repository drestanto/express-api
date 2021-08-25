// ----------========== INITIATE ==========----------

const express = require("express");
const app = express();

const port = 3000;

function start() {
    console.log("Express project listening at http://localhost:" + port);
}

app.listen(port, start);

// ----------==============================----------

let posts = require('./db/posts.json');

function getPosts(req, res) {
    res.status(200).json(posts);
}

function getPost(req, res) {
    const post = posts.find((item) => {
        return item.id == req.params.id
    });
    if (post == undefined) {
        res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

function createPost(req, res) {
    const id = posts.length + 1;
    const title = req.body.title;
    const body = req.body.body;

    const newPost = {
        "id": id,
        "title": title,
        "body": body
    }

    posts.push(newPost);

    res.status(201).json(newPost);
}

function updatePost(req, res) {
    const idx = posts.findIndex((item) => {
        return item.id == req.params.id;
    });

    posts[idx].title = req.body.title;
    posts[idx].body = req.body.body;

    res.status(200).json(posts[idx]);
}

function deletePost(req, res) {
    posts = posts.filter((item) => {
        return item.id != req.params.id;
    });

    res.status(200).json({
        message: `Post dengan id ${req.params.id} sudah berhasil dihapus!`
    });
}

app.get('/api/v1/posts', getPosts);
app.get('/api/v1/post/:id', getPost);
app.post('/api/v1/createPost', createPost);
app.put('/api/v1/updatePost/:id', updatePost);
app.delete('/api/v1/deletePost/:id', deletePost);