"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3, UserCheck, Plus, X } from "lucide-react"
import {
  BarChart,
  Bar,
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

interface TeamMember {
  name: string
  role: string
  status: "active" | "busy"
}

interface Team {
  name: string
  efficiency: string
  projects: string
  members: TeamMember[]
}

const initialTeams: Team[] = [
  {
    name: "Del Team",
    efficiency: "94%",
    projects: "6 active projects",
    members: [
      { name: "Arjun Mehta", role: "Creative Director", status: "active" },
      { name: "Priya Sharma", role: "Project Manager", status: "busy" },
      { name: "Rahul Singh", role: "Video Editor", status: "active" },
      { name: "Neha Gupta", role: "Social Media Manager", status: "active" },
    ],
  },
  {
    name: "Centinals",
    efficiency: "97%",
    projects: "9 active projects",
    members: [
      { name: "Sanjay Kumar", role: "Creative Director", status: "active" },
      { name: "Kavya Reddy", role: "Project Manager", status: "active" },
      { name: "Amit Patel", role: "Video Editor", status: "busy" },
      { name: "Riya Agarwal", role: "Social Media Manager", status: "active" },
    ],
  },
  {
    name: "Alpha Team",
    efficiency: "91%",
    projects: "5 active projects",
    members: [
      { name: "Vikram Singh", role: "Creative Director", status: "active" },
      { name: "Sunita Verma", role: "Project Manager", status: "active" },
      { name: "Rohit Sharma", role: "Video Editor", status: "active" },
      { name: "Pooja Singh", role: "Social Media Manager", status: "busy" },
    ],
  },
]

const teamPerformanceData = [
  { team: "Del Team", efficiency: 94, projects: 6, revenue: 180000 },
  { team: "Centinals", efficiency: 97, projects: 9, revenue: 250000 },
  { team: "Alpha Team", efficiency: 91, projects: 5, revenue: 150000 },
]

// Chart configurations for better tooltip styling
const teamEfficiencyConfig = {
  efficiency: {
    label: "Efficiency",
    color: "hsl(var(--chart-1))",
  },
};

const teamRevenueConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
};

export default function TeamManagementPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const teamName = formData.get("team") as string
    const newMember: TeamMember = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      status: "active",
    }

    setTeams(teams.map((team) => (team.name === teamName ? { ...team, members: [...team.members, newMember] } : team)))
    setIsAddMemberModalOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "busy":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserCheck className="h-8 w-8" /> Team Management
          </h1>
          <p className="text-gray-400 mt-1">Monitor team performance and manage members</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowAnalytics(!showAnalytics)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {showAnalytics ? "Hide" : "Show"} Performance Report
          </Button>
          <Dialog open={isAddMemberModalOpen} onOpenChange={setIsAddMemberModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <Label>Team</Label>
                  <Select name="team" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Del Team">Del Team</SelectItem>
                      <SelectItem value="Centinals">Centinals</SelectItem>
                      <SelectItem value="Alpha Team">Alpha Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Name</Label>
                  <Input name="name" placeholder="Enter member name" required />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select name="role" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Creative Director">Creative Director</SelectItem>
                      <SelectItem value="Project Manager">Project Manager</SelectItem>
                      <SelectItem value="Video Editor">Video Editor</SelectItem>
                      <SelectItem value="Social Media Manager">Social Media Manager</SelectItem>
                      <SelectItem value="Designer">Designer</SelectItem>
                      <SelectItem value="Videographer">Videographer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Add Member
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
              <CardTitle>Team Performance Analytics</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAnalytics(false)} aria-label="Close analytics">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Team Efficiency</h3>
              <ChartContainer config={teamEfficiencyConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="efficiency" fill="var(--color-efficiency)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Revenue by Team</h3>
              <ChartContainer config={teamRevenueConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={teamPerformanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="revenue"
                      label={({ team, percent }) => `${team} ${(percent * 100).toFixed(0)}%`}
                    >
                      {teamPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#FFD700", "#8B5CF6", "#06B6D4"][index]} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      formatter={(value: number) => [`₹${(value / 1000).toFixed(0)}K`, "Revenue"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {teams.map((team, index) => (
          <Card key={team.name} className="relative">
            <BorderBeam delay={index * 0.2} />
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{team.name}</CardTitle>
                  <p className="text-gray-400">{team.projects}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{team.efficiency}</div>
                  <p className="text-sm text-gray-400">Efficiency</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {team.members.map((member, memberIndex) => (
                <div key={memberIndex} className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{member.name}</h4>
                    <Badge className={`${getStatusColor(member.status)} border-0`}>{member.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
