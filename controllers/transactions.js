import Transaction from '../models/Transaction.js';

// get all transactions
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().
        populate('category').
        sort({ date: -1 });
        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

export const addTransaction = async (req, res) => {
    try {
        // do this to check if there is an input ( Input Validation )
        const { text, amount } = req.body; // this is what we expect to receive from the user
        if (!text || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Please provide text and amount'
            })
        }

        // this is what creates the data in mongodb
        const transaction = await Transaction.create(req.body);
        await transaction.populate('category') // always send the request inside the create function to POST
        return res.status(201).json({
            success: true,
            data: transaction 
        })
    } catch (error) {
        console.log(error);
        // this logs the error, and checks if the error is Validation Error so it means that the fields arent filled properly.
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Please fill in all require fields'
            })
        }
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

export const deleteTransaction = async (req, res) => {
    
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({msg: 'Transaction not found!'})
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted transaction'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

export const clearTransactions = async (req, res) => {
    
    try {
        await Transaction.deleteMany({});

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted all transactions',
            data: []
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

export const editTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByIdAndUpdate(id, req.body);
        

        if (!transaction) {
            return res.status(404).json({msg: 'Transaction not found!'})
        }

        const updatedTransaction = await Transaction.findById(id);
        await updatedTransaction.populate('category')
        return res.status(200).json({
            success: true,
            data: updatedTransaction
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}