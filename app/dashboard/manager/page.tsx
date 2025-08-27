"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  BarChart3,
  Target,
  Zap
} from "lucide-react"

const managerStats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+3",
    icon: Target,
    color: "text-blue-400",
  },
  {
    title: "Team Capacity",
    value: "87%",
    change: "Optimal",
    icon: Users,
    color: "text-green-400",
  },
  {
    title: "On-Time Delivery",
    value: "94%",
    change: "+2%",
    icon: CheckCircle,
    color: "text-green-400",
  },
  {
    title: "Client Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    icon: TrendingUp,
    color: "text-purple-400",
  },
]

const activeProjects = [
  {
    id: "1",
    title: "Nike Brand Campaign",
    client: "Nike",
    status: "on-track",
    progress: 75,
    deadline: "2024-01-25",
    team: ["John D.", "Sarah M.", "Mike R."],
    budget: "$45,000",
    spent: "$32,000",
  },
  {
    id: "2",
    title: "Apple Product Launch",
    client: "Apple",
    status: "at-risk",
    progress: 60,
    deadline: "2024-02-01",
    team: ["Alex K.", "Lisa P."],
    budget: "$38,000",
    spent: "$28,000",
  },
  {
    id: "3",
    title: "Starbucks Social Series",
    client: "Starbucks",
    status: "on-track",
    progress: 85,
    deadline: "2024-01-30",
    team: ["David L.", "Emma W."],
    budget: "$22,000",
    spent: "$18,000",
  },
]

const teamWorkload = [
  {
    name: "John D.",
    role: "Lead Editor",
    currentLoad: 85,
    projects: 3,
    availability: "Available",
    nextAvailable: "2024-01-20",
  },
  {
    name: "Sarah M.",
    role: "Videographer",
    currentLoad: 95,
    projects: 2,
    availability: "Overloaded",
    nextAvailable: "2024-01-28",
  },
  {
    name: "Mike R.",
    role: "Motion Designer",
    currentLoad: 70,
    projects: 2,
    availability: "Available",
    nextAvailable: "2024-01-18",
  },
  {
    name: "Alex K.",
    role: "Colorist",
    currentLoad: 60,
    projects: 1,
    availability: "Available",
    nextAvailable: "2024-01-15",
  },
]

const upcomingDeadlines = [
  {
    id: "1",
    project: "Nike Brand Campaign",
    client: "Nike",
    deadline: "2024-01-25",
    daysLeft: 5,
    priority: "high",
    status: "Final Review",
  },
  {
    id: "2",
    project: "Starbucks Social Series",
    client: "Starbucks",
    deadline: "2024-01-30",
    daysLeft: 10,
    priority: "medium",
    status: "Editing",
  },
  {
    id: "3",
    project: "Apple Product Launch",
    client: "Apple",
    deadline: "2024-02-01",
    daysLeft: 12,
    priority: "high",
    status: "Shooting",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "on-track":
      return "bg-green-100 text-green-800 border-green-200"
    case "at-risk":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "behind":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getAvailabilityColor(availability: string) {
  switch (availability) {
    case "Available":
      return "bg-green-100 text-green-800 border-green-200"
    case "Overloaded":
      return "bg-red-100 text-red-800 border-red-200"
    case "Limited":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ManagerDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Project Manager Dashboard</h2>
          <p className="text-gray-400 mt-1">Monitor team workload, project timelines, and resource allocation</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Team Overview
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {managerStats.map((stat, index) => {
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
        {/* Active Projects */}
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Active Projects Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-600">Client: {project.client}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace("-", " ")}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-600">Budget: {project.budget}</p>
                      <p className="text-gray-600">Spent: {project.spent}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Deadline: {project.deadline}</p>
                      <p className="text-gray-600">Team: {project.team.length} members</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      View Team
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Timeline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Workload */}
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Workload & Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamWorkload.map((member, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <Badge className={getAvailabilityColor(member.availability)}>
                      {member.availability}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Load</span>
                      <span>{member.currentLoad}%</span>
                    </div>
                    <Progress value={member.currentLoad} className="h-2" />
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-600">
                    <p>Projects: {member.projects} | Next Available: {member.nextAvailable}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Upcoming Deadlines & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{deadline.project}</h4>
                    <p className="text-sm text-gray-600">Client: {deadline.client}</p>
                    <p className="text-sm text-gray-600">Status: {deadline.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(deadline.priority)}>
                      {deadline.priority}
                    </Badge>
                    <Badge variant="outline">
                      {deadline.daysLeft} days left
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Assign Team
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button size="sm" variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    Expedite
                  </Button>
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
            <BarChart3 className="w-5 h-5" />
            Management Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              <span className="text-sm">New Project</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              <span className="text-sm">Team Assign</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              <span className="text-sm">Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="w-6 h-6 mb-2" />
              <span className="text-sm">Budget</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
