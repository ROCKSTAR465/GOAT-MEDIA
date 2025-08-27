"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Receipt,
  Calculator,
  PieChart,
  Target,
  Zap,
  FileText,
  CreditCard,
  Banknote
} from "lucide-react"

const financeStats = [
  {
    title: "Total Revenue",
    value: "$2.4M",
    change: "+18%",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    title: "Active Budgets",
    value: "$1.8M",
    change: "On Track",
    icon: Target,
    color: "text-blue-400",
  },
  {
    title: "Outstanding Invoices",
    value: "$320K",
    change: "-12%",
    icon: Receipt,
    color: "text-yellow-400",
  },
  {
    title: "Profit Margin",
    value: "34%",
    change: "+2.1%",
    icon: PieChart,
    color: "text-purple-400",
  },
]

const clientBudgets = [
  {
    id: "1",
    client: "Nike",
    project: "Brand Campaign",
    totalBudget: "$450,000",
    spent: "$320,000",
    remaining: "$130,000",
    status: "on-track",
    burnRate: "71%",
    deadline: "2024-01-25",
  },
  {
    id: "2",
    client: "Apple",
    project: "Product Launch",
    totalBudget: "$380,000",
    spent: "$280,000",
    remaining: "$100,000",
    status: "at-risk",
    burnRate: "74%",
    deadline: "2024-02-01",
  },
  {
    id: "3",
    client: "Starbucks",
    project: "Social Series",
    totalBudget: "$220,000",
    spent: "$180,000",
    remaining: "$40,000",
    status: "on-track",
    burnRate: "82%",
    deadline: "2024-01-30",
  },
  {
    id: "4",
    client: "Tesla",
    project: "Corporate Video",
    totalBudget: "$180,000",
    spent: "$95,000",
    remaining: "$85,000",
    status: "under-budget",
    burnRate: "53%",
    deadline: "2024-02-15",
  },
]

const paymentStatus = [
  {
    id: "1",
    client: "Nike",
    invoice: "INV-2024-001",
    amount: "$125,000",
    dueDate: "2024-01-20",
    status: "overdue",
    daysLate: 5,
    project: "Brand Campaign",
  },
  {
    id: "2",
    client: "Apple",
    invoice: "INV-2024-002",
    amount: "$95,000",
    dueDate: "2024-01-25",
    status: "pending",
    daysLate: 0,
    project: "Product Launch",
  },
  {
    id: "3",
    client: "Starbucks",
    invoice: "INV-2024-003",
    amount: "$75,000",
    dueDate: "2024-01-30",
    status: "pending",
    daysLate: 0,
    project: "Social Series",
  },
  {
    id: "4",
    client: "Tesla",
    invoice: "INV-2024-004",
    amount: "$60,000",
    dueDate: "2024-02-05",
    status: "pending",
    daysLate: 0,
    project: "Corporate Video",
  },
]

const costBreakdown = [
  {
    category: "Production",
    amount: "$850,000",
    percentage: 35,
    trend: "up",
    change: "+8%",
  },
  {
    category: "Post-Production",
    amount: "$620,000",
    percentage: 26,
    trend: "up",
    change: "+12%",
  },
  {
    category: "Equipment",
    amount: "$380,000",
    percentage: 16,
    trend: "stable",
    change: "0%",
  },
  {
    category: "Marketing",
    amount: "$290,000",
    percentage: 12,
    trend: "down",
    change: "-3%",
  },
  {
    category: "Administrative",
    amount: "$270,000",
    percentage: 11,
    trend: "stable",
    change: "0%",
  },
]

const financialKPIs = [
  {
    metric: "Cash Flow",
    value: "$180K",
    change: "+15%",
    trend: "up",
    status: "healthy",
  },
  {
    metric: "Accounts Receivable",
    value: "$320K",
    change: "-8%",
    trend: "down",
    status: "improving",
  },
  {
    metric: "Operating Expenses",
    value: "$1.2M",
    change: "+5%",
    trend: "up",
    status: "controlled",
  },
  {
    metric: "ROI per Project",
    value: "156%",
    change: "+12%",
    trend: "up",
    status: "excellent",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "on-track":
      return "bg-green-100 text-green-800 border-green-200"
    case "at-risk":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "over-budget":
      return "bg-red-100 text-red-800 border-red-200"
    case "under-budget":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getPaymentStatusColor(status: string) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200"
    case "partial":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getTrendColor(trend: string) {
  switch (trend) {
    case "up":
      return "text-green-500"
    case "down":
      return "text-red-500"
    case "stable":
      return "text-yellow-500"
    default:
      return "text-gray-500"
  }
}

export default function FinanceDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Finance Team Dashboard</h2>
          <p className="text-gray-400 mt-1">Monitor budgets, track payments, and analyze financial performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Receipt className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
          <Button>
            <Calculator className="w-4 h-4 mr-2" />
            New Budget
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financeStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card>
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
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Budgets */}
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Client Budget Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientBudgets.map((budget) => (
                <div key={budget.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{budget.client}</h4>
                      <p className="text-sm text-gray-600">{budget.project}</p>
                    </div>
                    <Badge className={getStatusColor(budget.status)}>
                      {budget.status.replace("-", " ")}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-600">Total: {budget.totalBudget}</p>
                      <p className="text-gray-600">Spent: {budget.spent}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Remaining: {budget.remaining}</p>
                      <p className="text-gray-600">Burn Rate: {budget.burnRate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Utilization</span>
                      <span>{budget.burnRate}</span>
                    </div>
                    <Progress value={parseInt(budget.burnRate)} className="h-2" />
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calculator className="w-4 h-4 mr-2" />
                      Adjust
                    </Button>
                    <Button size="sm" variant="outline">
                      <Receipt className="w-4 h-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Payment Status & Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentStatus.map((payment) => (
                <div key={payment.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{payment.client}</h4>
                      <p className="text-sm text-gray-600">{payment.project}</p>
                      <p className="text-sm text-gray-600">Invoice: {payment.invoice}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                      <p className="text-lg font-bold mt-1">{payment.amount}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-600">Due Date: {payment.dueDate}</p>
                      {payment.daysLate > 0 && (
                        <p className="text-red-600">Days Late: {payment.daysLate}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Mark Paid
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Invoice
                    </Button>
                    <Button size="sm" variant="outline">
                      <Clock className="w-4 h-4 mr-2" />
                      Remind
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Cost Breakdown by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costBreakdown.map((category, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-medium">{category.category}</h4>
                    <p className="text-sm text-gray-600">{category.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{category.percentage}%</p>
                    <p className={`text-sm ${getTrendColor(category.trend)}`}>
                      {category.change}
                    </p>
                  </div>
                </div>
                
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial KPIs */}
      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Key Financial Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialKPIs.map((kpi, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <h4 className="font-medium mb-2">{kpi.metric}</h4>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className={`text-sm ${getTrendColor(kpi.trend)}`}>
                    {kpi.change}
                  </p>
                  <Badge className="mt-2">
                    {kpi.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Financial Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Calculator className="w-6 h-6 mb-2" />
              <span className="text-sm">New Budget</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Receipt className="w-6 h-6 mb-2" />
              <span className="text-sm">Invoice</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <PieChart className="w-6 h-6 mb-2" />
              <span className="text-sm">Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
