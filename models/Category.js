import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    color: {
        type: String,
        default: '#3b82f6',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    }
})

const Category = mongoose.model("Category", CategorySchema);

export default Category;