import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    color: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    }
})

const Category = mongoose.model("Category", CategorySchema);

export default Category;