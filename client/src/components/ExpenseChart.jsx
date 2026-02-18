import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

    const chartData = Object.keys(totalCategory).map(keyName => {
        return {
            name: keyName,
            amount: totalCategory[keyName],
            fill: `var(--color-${keyName})`
        }
    })

    const chartConfig = {
    amount: {
        label: "Amount",
    },
};

    chartData.forEach((item, index) => {
        chartConfig[item.name] = {
            label: item.name,
            color: `var(--chart-${(index % 5) + 1})`,
        }
    })

    console.log(chartData)
    
    // We will do our math here!

    const totalExpenses = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    }, [chartData])

    return (
        <div>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
            <PieChart>
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
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
                            className="fill-foreground text-3xl font-bold"
                            >
                            {totalExpenses.toLocaleString()}
                        </tspan>
                        <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
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