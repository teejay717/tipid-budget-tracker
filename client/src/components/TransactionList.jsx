import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MdCallMade, MdCallReceived, MdDeleteOutline, MdEdit } from 'react-icons/md';
import ConfirmModal from './ConfirmModal';
import { formatNumber } from '../utils/format.js';
import TransactionModal from "../components/TransactionModal";

const TransactionList = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { transactions, getTransactions, deleteTransaction, clearTransactions, updateTransaction } = useContext(GlobalContext);

    const [editingTransaction, setEditingTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true)
    }

    useEffect(() => {
        getTransactions();
    }, [])

    console.log(transactions)

    return (
        <div className='mb-8'>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-4">
                <h3 className="text-md font-semibold text-gray-400">Recent</h3>
                {transactions.length > 0 && (
                    <button
                        onClick={() => setShowConfirmModal(true)}
                        className="text-xs text-gray-600/80 hover:text-red-700 font-bold uppercase tracking-wider transition-colors cursor-pointer"
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
                                    {transaction.category?.text && (
                                        <>
                                            <span></span>
                                            <div style={{ backgroundColor: transaction.category?.color}}
                                            className='p-0.5 rounded-full'></div>
                                            <span>{transaction.category?.text}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Amount */}
                            <span className={`font-bold ${textColor} whitespace-nowrap`}>
                                {sign}₱{formatNumber(Math.abs(transaction.amount))}
                            </span>

                            {/* Delete button — slides in from the right */}
                            <button
                                onClick={() => deleteTransaction(transaction._id)}
                                className=" text-white w-8 flex items-center justify-center duration-200 cursor-pointer p-1 rounded-lg transition-all hover:bg-gray-700"
                            >
                                <MdDeleteOutline className="text-lg text-gray-600 hover:text-red-500" />
                            </button>
                            <button
                                onClick={() => handleEditClick(transaction)}
                                className=" text-white w-8 flex items-center justify-center duration-200 cursor-pointer p-1 rounded-lg transition-all hover:bg-gray-700"
                            >
                                <MdEdit className="text-lg text-gray-600 hover:text-red-500" />
                            </button>
                        </li>
                    )
                })}
            </ul>
            
            <TransactionModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTransaction(null)}} 
                existingTransaction={editingTransaction}/>

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