"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3, TrendingUp, Plus, X } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Deal {
  id: string
  company: string
  contact: string
  value: string
  priority: "high" | "medium" | "low"
  date: string
  stage: "prospecting" | "qualified" | "proposal" | "negotiation" | "closed-won"
}

const initialDeals: Deal[] = [
  {
    id: "1",
    company: "TechStart Solutions",
    contact: "Rahul Sharma - CEO",
    value: "₹85K",
    priority: "high",
    date: "Aug 20, 2025",
    stage: "prospecting",
  },
  {
    id: "2",
    company: "Digital Innovations",
    contact: "Priya Patel - CMO",
    value: "₹65K",
    priority: "medium",
    date: "Aug 22, 2025",
    stage: "prospecting",
  },
  {
    id: "3",
    company: "GrowthCorp",
    contact: "Sunita Verma - Director",
    value: "₹1.2L",
    priority: "high",
    date: "Aug 18, 2025",
    stage: "qualified",
  },
  {
    id: "4",
    company: "BrandBoost",
    contact: "Neha Gupta - Head of Marketing",
    value: "₹1.5L",
    priority: "high",
    date: "Aug 15, 2025",
    stage: "proposal",
  },
  {
    id: "5",
    company: "Enterprise Solutions",
    contact: "Rajesh Kumar - CEO",
    value: "₹2.1L",
    priority: "high",
    date: "Aug 12, 2025",
    stage: "negotiation",
  },
  {
    id: "6",
    company: "SuccessStory Ltd",
    contact: "Kavya Reddy - Marketing Head",
    value: "₹1.8L",
    priority: "high",
    date: "Aug 24, 2025",
    stage: "closed-won",
  },
]

const salesAnalyticsData = [
  { stage: "Prospecting", count: 8, value: 450000 },
  { stage: "Qualified", count: 5, value: 320000 },
  { stage: "Proposal", count: 3, value: 280000 },
  { stage: "Negotiation", count: 2, value: 180000 },
  { stage: "Closed Won", count: 4, value: 520000 },
]

const stages: Deal["stage"][] = ["prospecting", "qualified", "proposal", "negotiation", "closed-won"]

// Chart configurations for better tooltip styling
const pipelineStageConfig = {
  count: {
    label: "Deal Count",
    color: "hsl(var(--chart-1))",
  },
};

const revenueStageConfig = {
  value: {
    label: "Revenue Value",
    color: "hsl(var(--chart-2))",
  },
};

export default function SalesPipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleAddDeal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDeal: Deal = {
      id: (deals.length + 1).toString(),
      company: formData.get("company") as string,
      contact: formData.get("contact") as string,
      value: formData.get("value") as string,
      priority: formData.get("priority") as "high" | "medium" | "low",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      stage: "prospecting",
    }
    setDeals([...deals, newDeal])
    setIsAddDealModalOpen(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8" /> Sales Pipeline
          </h1>
          <p className="text-gray-400 mt-1">Track deals through your sales process</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowAnalytics(!showAnalytics)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {showAnalytics ? "Hide" : "Show"} Analytics
          </Button>
          <Dialog open={isAddDealModalOpen} onOpenChange={setIsAddDealModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Deal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Deal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddDeal} className="space-y-4">
                <div>
                  <Label>Company Name</Label>
                  <Input name="company" placeholder="Enter company name" required />
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <Input name="contact" placeholder="Name - Position" required />
                </div>
                <div>
                  <Label>Deal Value</Label>
                  <Input name="value" placeholder="₹1.5L" required />
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select name="priority" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Add Deal
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showAnalytics && (
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Sales Analytics</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAnalytics(false)} aria-label="Close analytics">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Pipeline Stage Analysis</h3>
              <ChartContainer config={pipelineStageConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Revenue by Stage</h3>
              <ChartContainer config={revenueStageConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area type="monotone" dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {stages.map((stage) => (
          <div key={stage} className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold capitalize mb-1">{stage.replace("-", " ")}</h3>
              <p className="text-sm text-gray-400">
                {deals.filter((deal) => deal.stage === stage).length} deals
              </p>
            </div>
            <div className="space-y-3 min-h-[400px]">
              {deals
                .filter((deal) => deal.stage === stage)
                .map((deal) => (
                  <Card key={deal.id} className="relative">
                    <BorderBeam delay={Math.random() * 6} />
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">{deal.company}</h4>
                          <Badge className={`${getPriorityColor(deal.priority)} border-0 text-xs`}>
                            {deal.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">{deal.contact}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{deal.value}</span>
                          <span className="text-xs text-gray-500">{deal.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
