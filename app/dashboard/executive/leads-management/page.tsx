"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3, Users, Plus, X } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Lead {
  id: string
  company: string
  contact: string
  source: string
  budget: string
  status: "new" | "contacted" | "qualified" | "converted"
  nextAction: string
}

const initialLeads: Lead[] = [
  {
    id: "1",
    company: "TechStart Solutions",
    contact: "Rahul Sharma - CEO",
    source: "GOAT Mastermind",
    budget: "₹1.5L/month",
    status: "new",
    nextAction: "Shortlist Call",
  },
  {
    id: "2",
    company: "Digital Innovations",
    contact: "Priya Patel - CMO",
    source: "Social Media",
    budget: "₹1.2L/month",
    status: "contacted",
    nextAction: "Pitch Call",
  },
  {
    id: "3",
    company: "GrowthCorp",
    contact: "Sunita Verma - Director",
    source: "Kennet Alphy",
    budget: "₹2.1L/month",
    status: "qualified",
    nextAction: "Proposal",
  },
  {
    id: "4",
    company: "SuccessStory Ltd",
    contact: "Kavya Reddy - Marketing Head",
    source: "GOAT Mastermind",
    budget: "₹1.8L/month",
    status: "converted",
    nextAction: "Onboarding",
  },
]

const leadsAnalyticsData = [
  { month: "Jan", leads: 45, converted: 12 },
  { month: "Feb", leads: 52, converted: 15 },
  { month: "Mar", leads: 48, converted: 14 },
  { month: "Apr", leads: 61, converted: 18 },
  { month: "May", leads: 55, converted: 16 },
  { month: "Jun", leads: 67, converted: 22 },
  { month: "Jul", leads: 58, converted: 19 },
  { month: "Aug", leads: 72, converted: 25 },
]

const leadSourcesData = [
  { name: "GOAT Mastermind", value: 45, color: "#FFD700" },
  { name: "Social Media", value: 25, color: "#8B5CF6" },
  { name: "Kennet Alphy", value: 20, color: "#06B6D4" },
  { name: "Alfred Joshua", value: 10, color: "#F59E0B" },
]

// Chart configurations for better tooltip styling
const leadTrendConfig = {
  leads: {
    label: "Total Leads",
    color: "hsl(var(--chart-1))",
  },
  converted: {
    label: "Converted Leads",
    color: "hsl(var(--chart-2))",
  },
};

const leadSourcesConfig = {
  value: {
    label: "Lead Count",
    color: "hsl(var(--chart-1))",
  },
};

export default function LeadManagementPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newLead: Lead = {
      id: (leads.length + 1).toString(),
      company: formData.get("company") as string,
      contact: formData.get("contact") as string,
      source: formData.get("source") as string,
      budget: formData.get("budget") as string,
      status: "new",
      nextAction: "Initial Contact",
    }
    setLeads([...leads, newLead])
    setIsAddLeadModalOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-pink-500/20 text-pink-400"
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400"
      case "qualified":
        return "bg-blue-500/20 text-blue-400"
      case "converted":
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
            <Users className="h-8 w-8" /> Lead Management
          </h1>
          <p className="text-gray-400 mt-1">Track and manage your sales leads</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowAnalytics(!showAnalytics)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {showAnalytics ? "Hide" : "Show"} Analytics
          </Button>
          <Dialog open={isAddLeadModalOpen} onOpenChange={setIsAddLeadModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div>
                  <Label>Company Name</Label>
                  <Input name="company" placeholder="Enter company name" required />
                </div>
                <div>
                  <Label>Contact Person</Label>
                  <Input name="contact" placeholder="Name - Position" required />
                </div>
                <div>
                  <Label>Source</Label>
                  <Select name="source" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GOAT Mastermind">GOAT Mastermind</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Kennet Alphy">Kennet Alphy</SelectItem>
                      <SelectItem value="Alfred Joshua">Alfred Joshua</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Budget</Label>
                  <Input name="budget" placeholder="₹1.5L/month" required />
                </div>
                <Button type="submit" className="w-full">
                  Add Lead
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
              <CardTitle>Lead Analytics</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAnalytics(false)} aria-label="Close analytics">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Lead Conversion Trend</h3>
              <ChartContainer config={leadTrendConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={leadsAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Line type="monotone" dataKey="leads" stroke="var(--color-leads)" strokeWidth={3} />
                    <Line type="monotone" dataKey="converted" stroke="var(--color-converted)" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>
              <ChartContainer config={leadSourcesConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourcesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="relative">
            <BorderBeam delay={Math.random() * 2} />
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{lead.company}</h3>
                    <Badge className={`${getStatusColor(lead.status)} border-0`}>{lead.status}</Badge>
                  </div>
                  <p className="text-gray-400 mb-1">{lead.contact}</p>
                  <p className="text-sm text-gray-500">Source: {lead.source}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{lead.budget}</p>
                  <p className="text-sm text-gray-400">Next: {lead.nextAction}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
