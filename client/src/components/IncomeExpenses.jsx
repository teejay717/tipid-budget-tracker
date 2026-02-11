import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const IncomeExpenses = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount)
    // filter for positive numbers and add them

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    // filter for negative numbers and add them

    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
        .toFixed(2);

    return (
        <div className="flex justify-between bg-white shadow-lg p-5 mb-8 rounded-lg border border-gray-100 divide-x divide-gray-200">
            <div className="text-center w-1/2">
                <h4 className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Income</h4>
                <p className="text-xl font-bold text-green-500">+₱{income}</p>
            </div>
            <div className="text-center w-1/2 pl-4">
                <h4 className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Expense</h4>
                <p className="text-xl font-bold text-red-500">-₱{expense}</p>
            </div>
        </div>
    )
}

export default IncomeExpenses