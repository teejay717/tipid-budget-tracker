import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    },
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