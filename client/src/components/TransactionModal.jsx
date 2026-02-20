import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MdClose, MdDelete, MdDeleteOutline } from 'react-icons/md';

const TransactionModal = ({ isOpen, onClose, type, existingTransaction }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const { addTransaction, updateTransaction, deleteTransaction, categories, getCategories } = useContext(GlobalContext);
    
    React.useEffect(() => {
        if (existingTransaction) {
            setText(existingTransaction.text);
            setAmount(Math.abs(existingTransaction.amount));
            setCategory(existingTransaction.category?._id ?? existingTransaction.category);
            setDate(new Date(existingTransaction.date).toISOString().split('T')[0]);
        } else {
            if (isOpen) {
                setText('');
                setAmount('');
                setCategory('');
                setDate(new Date().toISOString().split('T')[0]);
            }
        }
    }, [existingTransaction, isOpen])

    React.useEffect(() => {
        getCategories();
    }, [])
    
    if (!isOpen) return null;
    
    const isExpense = type === 'expense'|| existingTransaction && existingTransaction.amount < 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            text,
            amount: (type === 'expense' || (existingTransaction && existingTransaction.amount < 0)) 
                ? -Math.abs(+amount) 
                : Math.abs(+amount),
            date
        };

        if (isExpense) {
            transactionData.category = category
        }

        if (existingTransaction) {
            updateTransaction(existingTransaction._id, transactionData)
        } else {
            addTransaction(transactionData);
        }

        // Reset fields
        setText('');
        setAmount('');
        setCategory('');
        setDate(new Date().toISOString().split('T')[0]);

        onClose();
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
        deleteTransaction(existingTransaction._id);
        onClose();
    }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {isExpense ? '– Add Expense' : '+ Add Income'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Text */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-1">Text</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="e.g. Weekly Allowance"
                            required
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            min="0.01"
                            step="0.01"
                            required
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Category — only for expenses */}
                    {isExpense && (
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-1">Category</label>
                            <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            required

                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.text}</option>
                                ))}
                            </select>
                            {/* <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g. Food, Transport"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            /> */}
                        </div>
                    )}

                    {/* Date */}
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Submit */}
                    <div className='flex flex-row gap-2 mt-4'>
                        <button
                            type="submit"
                            className={`flex-1 py-3 rounded-lg font-bold text-white cursor-pointer transition-colors ${existingTransaction ? 'bg-indigo-600 hover:bg-indigo-700 ' : (isExpense
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-700'
    )}`}
                        >
                            {existingTransaction ? 'Save Changes' : (isExpense ? 'Add Expense' : 'Add Income')}
                        </button>
                        {existingTransaction && (
                            <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-gray-800 border-gray-700 border hover:bg-red-700 text-white p-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                            title="Delete Transaction"
                        >
                            <MdDeleteOutline className="text-xl" />
                        </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
