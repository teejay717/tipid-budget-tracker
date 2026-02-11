import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MdCallMade, MdCallReceived, MdDeleteOutline } from 'react-icons/md';
import ConfirmModal from './ConfirmModal';


const TransactionList = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { transactions, getTransactions, deleteTransaction, clearTransactions } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
    }, [])

    return (
        <div className='mb-8'>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-4">
                <h3 className="text-lg font-bold text-gray-400">History</h3>
                {transactions.length > 0 && (
                    <button
                        onClick={() => setShowConfirmModal(true)}
                        className="text-xs text-gray-500 hover:text-red-700 font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <ul className='flex flex-col gap-2'>
                {transactions.map(transaction => {
                    const isExpense = transaction.amount < 0;
                    const sign = isExpense ? '-' : '+';
                    const textColor = isExpense ? 'text-red-400' : 'text-green-400';
                    const iconBg = isExpense ? 'bg-red-900/40' : 'bg-green-900/40';
                    const iconColor = isExpense ? 'text-red-400' : 'text-green-400';

                    return (
                        <li key={transaction._id} className="bg-gray-900 p-3 rounded-lg flex items-center gap-3 group hover:bg-gray-800/80 transition duration-200 relative overflow-hidden">
                            {/* Income/Expense icon */}
                            <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
                                {isExpense
                                    ? <MdCallMade className={`text-lg ${iconColor}`} />
                                    : <MdCallReceived className={`text-lg ${iconColor}`} />
                                }
                            </div>

                            {/* Text & details */}
                            <div className='flex flex-col flex-1 min-w-0'>
                                <span className="font-medium text-white">{transaction.text}</span>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <span>{new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    {transaction.category && (
                                        <>
                                            <span>·</span>
                                            <span>{transaction.category}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Amount */}
                            <span className={`font-bold ${textColor} whitespace-nowrap`}>
                                {sign}₱{Math.abs(transaction.amount).toFixed(2)}
                            </span>

                            {/* Delete button — slides in from the right */}
                            <button
                                onClick={() => deleteTransaction(transaction._id)}
                                className=" text-white w-8 flex items-center justify-center duration-200 cursor-pointer p-1 rounded-lg transition-all hover:bg-gray-700"
                            >
                                <MdDeleteOutline className="text-lg text-gray-600 hover:text-red-500" />
                            </button>
                        </li>
                    )
                })}
            </ul>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={clearTransactions}
                title="Clear All Transactions"
                message="Are you sure you want to delete all transactions? This action cannot be undone."
            />
        </div>
    )
}

export default TransactionList