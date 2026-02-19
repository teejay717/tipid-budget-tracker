import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { useNavigate } from 'react-router-dom';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const ExpenseChart = () => {

    const { transactions } = useContext(GlobalContext);
    const navigate = useNavigate();    
    const expenses = transactions.filter(transaction => transaction.amount < 0);

    const totalCategory = {};
    

    expenses.forEach(expense => {
        const category = expense.category;
        const positiveAmount = Math.abs(expense.amount);

        if (!totalCategory[category]) {
            totalCategory[category] = positiveAmount;
        } else {
            totalCategory[category] += positiveAmount;
        }
    })

    const COLORS = [
        "hsl(350, 89%, 60%)",
        "hsl(25, 95%, 53%)",
        "hsl(43, 100%, 50%)",
        "hsl(280, 75%, 60%)",
        "hsl(320, 80%, 60%)",
    ]

    const chartConfig = { amount: { label: "Amount" } };

    Object.keys(totalCategory).forEach((keyName, index) => {
        chartConfig[keyName] = {
            label: keyName,
            color: COLORS[index % COLORS.length],
        }
    })

    const chartData = Object.keys(totalCategory).map(keyName => {
        return {
            name: keyName,
            amount: totalCategory[keyName],
            fill: chartConfig[keyName].color,
        }
    })

    
    // We will do our math here!

    const totalExpenses = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    }, [chartData])

    return (
        <div>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[300px]"
            >
            <PieChart>
            <ChartTooltip
                cursor={false}a
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        const { name, amount } = payload[0].payload;
                        return (
                            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px' }}>
                                <p style={{ color: payload[0].payload.fill, fontWeight: 'bold', margin: 0 }}>{name}</p>
                                <p style={{ color: 'white', margin: 0 }}>₱{amount.toLocaleString()}</p>
                            </div>
                        );
                    }
                    return null;
                }}
            />
            <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                onClick={(sliceData) => {
                    navigate(`/history?category=${sliceData.name}`)
                }}
            >
                <Label
                content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                        <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        >
                        <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            style={{ fill: 'oklch(0.985 0 0)', fontSize: '1.5rem', fontWeight: 'bold' }}
                            >
                            {totalExpenses.toLocaleString()}
                        </tspan>
                        <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            style={{ fill: 'oklch(0.708 0 0)' }}
                        >
                            Expenses
                        </tspan>
                        </text>
                    )
                    }
                }}
                />
            </Pie>
            </PieChart>
            </ChartContainer>
        </div>
    )
}

export default ExpenseChart;