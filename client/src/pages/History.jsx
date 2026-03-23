import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState, useMemo } from "react";
import { GlobalContext } from "@/context/GlobalState";
import { MdCallMade, MdCallReceived, MdDeleteOutline, MdEdit } from 'react-icons/md';
import { formatNumber } from '../utils/format.js';
import TransactionModal from "@/components/TransactionModal.jsx";
import ConfirmModal from '@/components/ConfirmModal.jsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SearchBar from "@/components/SearchBar.jsx";
import { Button } from "@/components/ui/button.jsx";
import LoadingModal from "@/components/LoadingModal.jsx";

const History = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { transactions, getTransactions, deleteTransaction, clearTransactions, isLoading } = useContext(GlobalContext);
    const [typeFilter, setTypeFilter] = useState("all")
    const typeCategory = searchParams.get("category") || "allCategories";
    const [query, setQuery] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    
    
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true)
    }

    const uniqueCategories = [...new Set(transactions.map(t => t.category?.text).filter(Boolean))]
    
    const handleCategoryChange = (newValue) => {
        const newParams = new URLSearchParams(searchParams);
        if (newValue === "allCategories") {
            newParams.delete("category")
        } else {
            newParams.set("category", newValue)
        }
        setSearchParams(newParams);
    }
    
    const currentPeriod = searchParams.get("period") || "week";
    const handlePeriodChange = (newValue) => {
        const newParams = new URLSearchParams(searchParams);
        if (newValue === 'week') {
            newParams.delete("period")
        } else {
            newParams.set("period", newValue)
        }
        setSearchParams(newParams)
    }

    const displayedTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchesType = typeFilter === "all" ? true : (typeFilter === "expense" ? t.amount < 0 : t.amount > 0)
            const matchesCategory = typeCategory === "allCategories" ? true : t.category?.text === typeCategory
            const matchesSearch = query.trim().toLowerCase() === "" ? true : t.text.toLowerCase().includes(query.trim().toLowerCase()) 
            return matchesType && matchesCategory && matchesSearch;
        }
    )
    }, [transactions, typeFilter, typeCategory, query])
    

    // Search bar implementation
    // Get the users search value and trim it so that it has no spaces in the first and last
    // get the current displayed Transactions and then filter it so that we only return those transactions that Match or INCLUDEs the values that the user inputted.
    // My current concern is that Do i have to filter the displayed transactions even more so that It gets the users query. My concern is that i dont really know the structure of code to do exactly that right now. Because if I filter it separately like take displayedTransactions and then have a "Searched Transactions" it will be two diffrent lists.

    const isFiltered = () => {
        const isFiltered = query || typeFilter !== "all" || typeCategory !== "allCategories" ? true : false;
        return isFiltered;
    }

    const handleClearFilters = () => {
        setQuery("");
        setTypeFilter("all");
        setSearchParams("");
    }

    useEffect(() => {
        getTransactions(currentPeriod)
    }, [currentPeriod])

    return (
        <div className="max-w-8xl mx-2">
            <h1 className="text-2xl font-bold text-white mb-6">History</h1>
            
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="w-full sm:w-auto">
                    <SearchBar value={query} onChange={setQuery}/>
                </div>
                <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:flex-1 sm:justify-end">
                <Select value={currentPeriod} onValueChange={handlePeriodChange}>
                    <SelectTrigger className="w-full text-white sm:max-w-48">
                        <SelectValue placeholder="This Week" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="last30days">This Month</SelectItem>
                            <SelectItem value="month">Last 30 Days</SelectItem>
                            {/* <SelectItem value="year">Last 365 Days</SelectItem>   */}
                            <SelectItem value="all">All Time</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full text-white sm:max-w-48">
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all" onValueChange={setTypeFilter}>All Types</SelectItem>
                            <SelectItem value="income" onValueChange={setTypeFilter}>Income</SelectItem>
                            <SelectItem value="expense" onValueChange={setTypeFilter}>Expense</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={typeCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full text-white sm:max-w-48">
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="allCategories" onValueChange={handleCategoryChange}>All Categories</SelectItem>
                            {uniqueCategories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                {transactions.length > 0 && (
                    <button
                        onClick={() => setShowConfirmModal(true)}
                        className="text-xs text-gray-600/80 hover:text-red-700 font-bold uppercase tracking-wider transition-colors cursor-pointer
                        px-2 py-2 rounded-md border border-gray-600/60 hover:bg-red-700 sm:self-auto self-end"
                    >
                        <MdDeleteOutline className="text-lg text-white" />
                    </button>
                )}
            </div>
            
            <ul className='flex flex-col gap-2'>
                            {transactions.length === 0 ? (
                                <div className="text-center py-5 text-gray-500 italic">
                                    No history yet. Start logging your allowance and expenses to see your trends!
                                </div>
                            ) : displayedTransactions.length === 0 ? (
                                <div className="text-center py-5 text-gray-500 italic items-center flex flex-col">
                                    <p>No transactions found matching your criteria.</p>
                                    {isFiltered() ? (<Button className="mt-2 bg-gray-950"
                                                    variant="outline" 
                                                    onClick={() => {
                                                        handleClearFilters()
                                                    }}>Clear Filters</Button>) : ''}
                                </div>
                            ) :
                            displayedTransactions.map(transaction => {
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
            
                                        {/* Delete button  */}
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
                        <ConfirmModal
                        isOpen={showConfirmModal}
                        onClose={() => setShowConfirmModal(false)}
                        onConfirm={clearTransactions}
                        title="Clear All Transactions"
                        message="Are you sure you want to delete all transactions? This action cannot be undone."
            /> 
            <LoadingModal  
                open = {isLoading}
                title = 'Loading your history...'
                message = 'Please wait while we prepare your history...'/>/
        </div>
    );
};

export default History;
