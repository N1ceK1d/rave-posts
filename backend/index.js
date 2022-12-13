import postSchema from './post.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const app = express();
app.use(cors());
const port = 4444;
mongoose.set('strictQuery', true);

/*const userScheme = new Schema({id: Number, title: String, text: String}, {versionKey: false});
const User = mongoose.model("User", userScheme);*/
mongoose.connect('mongodb+srv://admin:rIbplCZpPavfbwkA@cluster0.1cogdfr.mongodb.net/blog?retryWrites=true&w=majority');
let post;
async function main() {
    
    post = await postSchema.find();
    console.log(post);

    mongoose.disconnect();
}

main().catch(console.log);

app.get('/posts', (req, res) => {
    res.send(post);
})

app.listen(port, () => {
    console.log("Server started!")
});

