"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Users, TrendingUp, DollarSign, Eye } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const executiveData = {
  totalRevenue: "₹24.8L",
  monthlyGrowth: "+18.5%",
  activeClients: 36,
  avgDealSize: "₹1.4L",
  conversionRate: "23.8%",
  teamUtilization: "87%",
  monthlyRecurring: "₹18.2L",
  newRevenue: "₹6.6L",
}

const revenueChartData = [
  { month: "Jan", revenue: 180000, target: 200000 },
  { month: "Feb", revenue: 220000, target: 220000 },
  { month: "Mar", revenue: 195000, target: 210000 },
  { month: "Apr", revenue: 240000, target: 230000 },
  { month: "May", revenue: 280000, target: 250000 },
  { month: "Jun", revenue: 320000, target: 270000 },
  { month: "Jul", revenue: 350000, target: 300000 },
  { month: "Aug", revenue: 248000, target: 320000 },
]

const clientRevenueData = [
  { name: "Enterprise Solutions", value: 210000, color: "#FFD700" },
  { name: "TechStart Solutions", value: 150000, color: "#FFA500" },
  { name: "BrandBoost", value: 120000, color: "#FF8C00" },
  { name: "GrowthCorp", value: 180000, color: "#FF7F50" },
  { name: "Others", value: 88000, color: "#FF6347" },
]

const overviewStats = [
  {
    title: "Total Revenue",
    value: executiveData.totalRevenue,
    change: executiveData.monthlyGrowth,
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    title: "Active Clients",
    value: executiveData.activeClients.toString(),
    change: "+12%",
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "Avg Deal Size",
    value: executiveData.avgDealSize,
    change: "+8.2%",
    icon: TrendingUp,
    color: "text-yellow-400",
  },
  {
    title: "Conversion Rate",
    value: executiveData.conversionRate,
    change: "+5.1%",
    icon: Eye,
    color: "text-purple-400",
  },
]

// Chart configurations for better tooltip styling
const revenueTargetConfig = {
  target: {
    label: "Target",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
};

const clientRevenueConfig = {
  value: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
};

export default function ExecutiveViewPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <DollarSign className="h-8 w-8" /> Executive Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Revenue Analytics & Business Intelligence</p>
        </div>
        <div className="flex items-center gap-2 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Live Revenue Tracking
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="relative">
              <BorderBeam delay={index * 0.2} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-secondary ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueTargetConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area type="monotone" dataKey="target" stackId="1" stroke="var(--color-target)" fill="var(--color-target)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="revenue" stackId="2" stroke="var(--color-revenue)" fill="var(--color-revenue)" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle>Revenue by Client</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={clientRevenueConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clientRevenueData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    formatter={(value: number) => [`₹${(value / 1000).toFixed(0)}K`, "Revenue"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle>Monthly Recurring Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{executiveData.monthlyRecurring}</div>
            <p className="text-green-400 text-sm">+15.2% from last month</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Retention Rate</span>
                <span>94.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Churn Rate</span>
                <span>5.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle>New Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{executiveData.newRevenue}</div>
            <p className="text-green-400 text-sm">+22.8% from last month</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">New Clients</span>
                <span>8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Upsells</span>
                <span>₹2.1L</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle>Team Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{executiveData.teamUtilization}</div>
            <p className="text-yellow-400 text-sm">Optimal range: 80-90%</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Billable Hours</span>
                <span>1,247h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Efficiency Score</span>
                <span>92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
