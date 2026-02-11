import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            text,
            amount: +amount,
            category
        }

        addTransaction(newTransaction);

        setText('');
        setAmount('');
    }

    return (
        <>
        <div>
        <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4 text-white">Add new transaction</h3>
        <form onSubmit={onSubmit}>
            <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Text</label>
            <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Enter text..." 
                className="w-auto p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow text-white" 
            />
            </div>
            <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
                Amount <br />
                <span className="text-xs font-normal text-white">(negative - expense, positive - income)</span>
            </label>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount..." 
                className="w-auto p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow text-white" 
            />
            </div>
            <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
                Category <br />
            </label>
            <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="Enter category" 
                className="w-auto p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow text-white" 
            />
            </div>
            <button className="w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200">
            Add Transaction
            </button>
        </form>
        </div>
        </>
    )
}

export default AddTransaction