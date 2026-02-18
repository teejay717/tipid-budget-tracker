import React from 'react';

const ExpenseChart = ({ transactions }) => {
    
    const expenses = transactions.forEach(transaction => transaction.amount < 0);

    const totalCategory = {};

    expenses.forEach(expense => {
        const category = expense.category;
        const positiveAmount = Math.abs(expense.amount);

        if (!totalCategory[category]) {
            totalCategory[category] = positiveAmount;
        } else {
            totalCategory[category] = positiveAmount;
        }
    })


    
    // We will do our math here!

    return (
        <div>
            {/* The Shadcn Chart will go here eventually */}
        </div>
    )
}

export default ExpenseChart;