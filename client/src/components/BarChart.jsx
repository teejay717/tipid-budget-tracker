import React, { useMemo } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const IncomeExpenseBarChart = () => {

const { transactions } = useContext(GlobalContext);

const chartData = useMemo(() => {
    
    const totals = transactions.reduce((acc, t) => {
        if (t.amount > 0) {
            acc.income += t.amount;
        } else {
            acc.expense += Math.abs(t.amount)
        }
        return acc;
    }, {income: 0, expense: 0})

    return [
        { label: "Current Period", income: totals.income, expense: totals.expense}
    ]
}, [transactions])

const chartConfig = {
    income: {
        label: "Income",
        color: "#4ade80", // Tailwind green-400
    },
    expense: {
        label: "Expense",
        color: "#f87171", // Tailwind red-400
    },
};

    return (
        <>
        <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-4">
                <h3 className="text-lg font-bold text-gray-500">Monthly Overview</h3>
        </div>
        <ChartContainer config={chartConfig} className="min-h-25 max-h-[250px] w-full rounded-xl border border-gray-800 bg-gray-900/60 py-2">
        <BarChart className='mt-2' accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            {/* <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            /> */}
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend className="text-white mb-2" content={<ChartLegendContent />} />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} maxBarSize={200}/>
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} maxBarSize={200} />
        </BarChart>
        </ChartContainer>
        </>
    )
}

export default IncomeExpenseBarChart;
