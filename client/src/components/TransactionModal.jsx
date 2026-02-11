import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MdClose } from 'react-icons/md';

const TransactionModal = ({ isOpen, onClose, type }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const { addTransaction } = useContext(GlobalContext);

    if (!isOpen) return null;

    const isExpense = type === 'expense';

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            text,
            amount: isExpense ? -Math.abs(+amount) : Math.abs(+amount),
            category: isExpense ? category : '',
            date
        };

        addTransaction(newTransaction);

        // Reset fields
        setText('');
        setAmount('');
        setCategory('');
        setDate(new Date().toISOString().split('T')[0]);
        onClose();
    };

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
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g. Food, Transport"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
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
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-bold text-white mt-2 cursor-pointer transition-colors ${isExpense
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {isExpense ? 'Add Expense' : 'Add Income'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
