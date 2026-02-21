import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/GlobalState";
import { MdCallMade, MdCallReceived, MdDeleteOutline, MdEdit } from 'react-icons/md';
import { formatNumber } from '../utils/format.js';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const History = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);
    const [typeFilter, setTypeFilter] = useState("all")
    const typeCategory = searchParams.get("category") || "allCategories";

    console.log(typeFilter)
    console.log(typeCategory)

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

    const displayedTransactions = transactions.filter(t => {
        const matchesType = typeFilter === "all" ? true : (typeFilter === "expense" ? t.amount < 0 : t.amount > 0)
        const matchesCategory = typeCategory === "allCategories" ? true : t.category?.text === typeCategory
        return matchesType && matchesCategory;
    }
    )

    useEffect(() => {
        getTransactions()
    }, [])

    
    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-white mb-6">History</h1>
            <div className="flex flex-row gap-2 mb-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full max-w-48 text-white">
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
                    <SelectTrigger className="w-full max-w-48 text-white">
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
            <ul className='flex flex-col gap-2'>
                            {displayedTransactions.map(transaction => {
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
        </div>
    );
};

export default History;
