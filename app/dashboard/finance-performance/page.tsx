"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, AlertTriangle, BarChart as BarChartIcon, Users, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const financeData = {
  profitability: [
    { client: "Innovate Inc.", profit: 90, revenue: 50000, costs: 5000 },
    { client: "Quantum Solutions", profit: 75, revenue: 80000, costs: 20000 },
    { client: "Apex Enterprises", profit: 40, revenue: 30000, costs: 18000 },
    { client: "Zendesk", profit: 60, revenue: 60000, costs: 24000 },
  ],
  budgetBurnRate: [
    { name: 'Q1', budget: 40000, burn: 24000 },
    { name: 'Q2', budget: 30000, burn: 13980 },
    { name: 'Q3', budget: 50000, burn: 48000 },
    { name: 'Q4', budget: 27800, burn: 29080 },
  ],
  revenueMargin: [
    { name: 'Jan', revenue: 40000, margin: 24000 },
    { name: 'Feb', revenue: 30000, margin: 13980 },
    { name: 'Mar', revenue: 50000, margin: 28000 },
    { name: 'Apr', revenue: 27800, margin: 19080 },
    { name: 'May', revenue: 18900, margin: 14800 },
    { name: 'Jun', revenue: 23900, margin: 13800 },
    { name: 'Jul', revenue: 34900, margin: 24900, forecast: 34900 },
  ],
  recentTransactions: [
      { id: 1, item: "Software Subscription", amount: -250, date: "2024-09-14" },
      { id: 2, item: "Client Payment: Innovate Inc.", amount: 10000, date: "2024-09-13" },
      { id: 3, item: "Freelancer Payment", amount: -1500, date: "2024-09-12" },
  ]
};

// Chart configurations for better tooltip styling
const budgetBurnConfig = {
  budget: {
    label: "Budget",
    color: "hsl(var(--chart-1))",
  },
  burn: {
    label: "Burn Rate",
    color: "hsl(var(--chart-2))",
  },
};

const revenueMarginConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  margin: {
    label: "Margin",
    color: "hsl(var(--chart-2))",
  },
  forecast: {
    label: "Forecast",
    color: "hsl(var(--chart-3))",
  },
};

export default function FinancePerformancePage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2"><DollarSign className="h-8 w-8" /> Finance & Performance</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChartIcon className="h-4 w-4" />Budget vs. Burn Rate</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                    <ChartContainer config={budgetBurnConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={financeData.budgetBurnRate}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Legend />
                                <Bar dataKey="budget" fill="var(--color-budget)" />
                                <Bar dataKey="burn" fill="var(--color-burn)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4" />Monthly Revenue & Margin</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                    <ChartContainer config={revenueMarginConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={financeData.revenueMargin}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <ChartTooltip
                                    content={<ChartTooltipContent indicator="line" />}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="revenue" stackId="1" stroke="var(--color-revenue)" fill="var(--color-revenue)" />
                                <Area type="monotone" dataKey="margin" stackId="1" stroke="var(--color-margin)" fill="var(--color-margin)" />
                                 <Area type="monotone" dataKey="forecast" stackId="2" strokeDasharray="5 5" stroke="var(--color-forecast)" fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Client Profitability</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Costs</TableHead>
                                <TableHead>Profit Margin</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {financeData.profitability.map(item => (
                                <TableRow key={item.client}>
                                    <TableCell className="font-medium">{item.client}</TableCell>
                                    <TableCell>${item.revenue.toLocaleString()}</TableCell>
                                    <TableCell>${item.costs.toLocaleString()}</TableCell>
                                    <TableCell><Badge>{item.profit}%</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                     {financeData.recentTransactions.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary mb-2">
                            <div>
                                <p className="font-medium">{item.item}</p>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                            <p className={`font-semibold ${item.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
