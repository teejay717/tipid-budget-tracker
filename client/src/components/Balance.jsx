import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { formatNumber } from '../utils/format.js'

const Balance = () => {

    const { transactions } = useContext(GlobalContext)

    // THIS WEEK
    const thisWeeksTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        const now = new Date();
        return tDate.getDate() > now.getDate() - 7 && tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    })

    const thisWeeksAmount = thisWeeksTransactions.map(t => t.amount);
    // const thisWeeksTotal = formatNumber(thisWeeksAmount.reduce((acc,i) => (acc += i), 0));
    const weekIncome = (
        thisWeeksAmount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
    )
    const weekExpense = (
        thisWeeksAmount
            .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    )

    // THIS MONTH
    const thisMonthsTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        const now = new Date();
        return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    })

    const thisMonthsAmount = thisMonthsTransactions.map(t => t.amount);

    const monthIncome = (
        thisMonthsAmount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
    )
    const monthExpense = (
        thisMonthsAmount
            .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    )

    const amounts = transactions.map(transaction => transaction.amount)
    const totalAmount = amounts.reduce((acc, item) => (acc += item), 0);
    const total = formatNumber(totalAmount)

    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    const income = formatNumber(incomeTotal)

    const expenseTotal = (
        amounts
            .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    );

    const expense = formatNumber(expenseTotal)

    return (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {/* Total Balance */}
            <div className="col-span-2 flex min-w-0 flex-col justify-center rounded-xl border border-green-800/60 bg-green-950/30 p-4 sm:col-span-1 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                    <MdAccountBalanceWallet className="text-green-500 text-sm" />
                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Balance</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                    ₱{total}
                </h1>
            </div>

            {/* This Week */}
            <div className="flex min-w-0 flex-col justify-center rounded-xl border border-gray-800 bg-gray-900/60 p-4 sm:p-5">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">This Week</span>
                <h2 className="text-lg font-bold text-green-400 sm:text-xl">
                    +₱{formatNumber(weekIncome)}
                </h2>
                <h2 className="text-lg font-bold text-red-400 sm:text-xl">
                    -₱{formatNumber(weekExpense  == -0.00 ? '0.00' : weekExpense)}
                </h2>
            </div>

            {/* Expense */}
            <div className="flex min-w-0 flex-col justify-center rounded-xl border border-gray-800 bg-gray-900/60 p-4 sm:p-5">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">This Month</span>
                <h2 className="text-lg font-bold text-green-400 sm:text-xl">
                    +₱{formatNumber(monthIncome)}
                </h2>
                <h2 className="text-lg font-bold text-red-400 sm:text-xl">
                    -₱{formatNumber(monthExpense  == -0.00 ? '0.00' : monthExpense)}
                </h2>
            </div>
        </div>
    )
}

export default Balance
