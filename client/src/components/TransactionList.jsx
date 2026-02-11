import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {

    const { transactions, getTransactions, deleteTransaction, clearTransactions } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
    }, [])

  return (
    <div className='mb-8'>
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-lg font-bold text-gray-700">History</h3>
            {transactions.length > 0 && (
                <button 
                    onClick={clearTransactions}
                    className="text-xs text-red-500 hover:text-red-700 font-bold uppercase tracking-wider transition-colors"
                >
                    Clear All
                </button>
            )}
        </div>
        
        <ul>
            {transactions.map(transaction => {
                const sign = transaction.amount < 0 ? '-' : '+';
                const borderColor = transaction.amount < 0 ? 'border-red-500' : 'border-green-500';
                const textColor = transaction.amount < 0 ? 'text-red-600' : 'text-green-600'

                return (
                    <li key={transaction._id} className={`bg-white p-3 rounded shadow-sm flex justify-between items-center border-r-4 ${borderColor} group hover:shadow-md transition duration-200 relative overflow-hidden`}>
                    <div className='flex flex-col'>
                        <span className="pl-2 font-medium text-gray-600 group-hover:translate-x-2 transition-transform duration-200">{transaction.text}</span>
                        <span className="pl-2 font-medium text-gray-600 group-hover:translate-x-2 transition-transform duration-200">{transaction.category}</span>
                    </div>
                    
                    <span className={`font-bold ${textColor}`}>
                    {sign}₱{Math.abs(transaction.amount)}
                    </span>
                    <button 
                    onClick={() => deleteTransaction(transaction._id)} 
                    className="absolute left-0 top-0 bottom-0 bg-red-500 text-white w-8 flex items-center justify-center -translate-x-full group-hover:translate-x-0 transition-transform duration-200 cursor-pointer z-10"
                    >
                    ✕
                    </button>
                </li>
                )
            })}
        </ul>

    </div>
  )
}

export default TransactionList