import postSchema from './post.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const Schema = mongoose.Schema;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({inflate:false}));

const port = 4444;

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://admin:rIbplCZpPavfbwkA@cluster0.1cogdfr.mongodb.net/blog?retryWrites=true&w=majority');
let post;

app.get('/posts', async (req, res) => {
    let posts = await postSchema.find();
    res.send(posts);
})

app.post('/posts', async (req, res) => {
    const new_post = new postSchema(
        {
            title: req.body.title,
            text: req.body.text,
            user: req.userId
        });

    post = await new_post.save();
    console.log(post);
    res.json(post);
})

app.listen(port, () => {
    console.log("Server started!")
});