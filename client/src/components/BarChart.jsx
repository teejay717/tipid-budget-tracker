import React, { useMemo } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const IncomeExpenseBarChart = () => {

const { transactions } = useContext(GlobalContext);

const chartData = useMemo(() => {

    const last6months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date();

        d.setMonth(d.getMonth() - (5 - i))
        return {
            label: d.toLocaleString('default', { month: 'short' }),
            monthNum: d.getMonth(),
            year: d.getFullYear(),
            income: 0,
            expense: 0
        }
    })

    transactions.forEach(t => {
        const tDate = new Date(t.date);
        const tMonth = tDate.getMonth();
        const tYear = tDate.getFullYear();

        const monthMatch = last6months.find(m => m.monthNum === tMonth && m.year === tYear);

        if (monthMatch) {
            if (t.amount > 0) {
                monthMatch.income += t.amount
            } else {
                monthMatch.expense += Math.abs(t.amount)
            }
        }
    })

    return last6months;
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
            <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 20, right: 20 }} // Adds breathing room on the sides
                />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend className="text-white mb-2" content={<ChartLegendContent />} />
            <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} 
                barSize={32}/>
            <Bar dataKey="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} 
                barSize={32} />
        </BarChart>
        </ChartContainer>
        </>
    )
}

export default IncomeExpenseBarChart;
