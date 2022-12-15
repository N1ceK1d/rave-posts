// импортируем пакет mongoose
import mongoose from "mongoose";

// создаем схему
const postSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    viewsCount: {
        type: Number,
    },
},
{
    timestamps: true,
},);

// экспортируем модель post
export default mongoose.model('post', postSchema)