import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

const Balance = () => {

    const { transactions } = useContext(GlobalContext)

    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <div className="mb-6 text-center">
            <h4 className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Your Balance</h4>
            <h1 className={`text-4xl font-extrabold ${total < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                ₱{total}
            </h1>
        </div>
    )
    }

export default Balance