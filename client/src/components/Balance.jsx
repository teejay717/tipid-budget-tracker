import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

const Balance = () => {

    const { transactions } = useContext(GlobalContext)

    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

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
        <div className="flex gap-8 mb-6 text-center border-2 border-gray-700 rounded-lg h-auto">
            <div className='w-xs h-36 border-2 rounded-lg border-gray-800 items-center content-center text-left px-12 bg-gray-900'>
                <h4 className="text-gray-500 text-lg uppercase tracking-wider font-semibold">Your Balance</h4>
                <h1 className={`text-4xl font-extrabold ${total < 0 ? 'text-red-600' : 'text-white'}`}>
                ₱{total}
                </h1>
            </div>
            <div className='w-xs h-36 border-2 rounded-lg border-gray-800 items-center content-center text-left px-12 bg-gray-900'>
                <h4 className="text-gray-500 text-lg uppercase tracking-wider font-semibold">Income</h4>
                <h1 className={`text-4xl font-extrabold text-green-600`}>
                ₱{income}
                </h1>
            </div>
            <div className='w-xs h-36 border-2 rounded-lg border-gray-800 items-center content-center text-left px-12 bg-gray-900'>
                <h4 className="text-gray-500 text-lg uppercase tracking-wider font-semibold">Expense</h4>
                <h1 className={`text-4xl font-extrabold text-red-700`}>
                ₱{expense}
                </h1>
            </div>
        </div>
    )
    }

export default Balance