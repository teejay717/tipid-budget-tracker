import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please select a category']
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;