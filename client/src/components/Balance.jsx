import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { formatNumber } from '../utils/format.js'

const Balance = () => {

    const { transactions } = useContext(GlobalContext)

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
        <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Total Balance */}
            <div className="rounded-xl border border-green-800/60 bg-green-950/30 p-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                    <MdAccountBalanceWallet className="text-green-500 text-sm" />
                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Balance</span>
                </div>
                <h1 className={`text-3xl font-extrabold text-white`}>
                    ₱{total}
                </h1>
            </div>

            {/* Income */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 flex flex-col justify-center">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Income</span>
                <h2 className="text-xl font-bold text-green-400">
                    +₱{income}
                </h2>
            </div>

            {/* Expense */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-5 flex flex-col justify-center">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Expense</span>
                <h2 className="text-xl font-bold text-red-400">
                    -₱{expense == -0.00 ? '0.00' : expense}
                </h2>
            </div>
        </div>
    )
}

export default Balance
