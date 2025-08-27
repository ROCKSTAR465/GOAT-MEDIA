"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MyTasksHub } from "@/components/dashboard/sections/MyTasksHub"
import { 
  Palette, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Edit3, 
  Camera, 
  FileText,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react"

const creativeStats = [
  {
    title: "Active Scripts",
    value: "8",
    change: "+2",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    title: "Shoots Today",
    value: "3",
    change: "On Track",
    icon: Camera,
    color: "text-green-400",
  },
  {
    title: "Pending Edits",
    value: "12",
    change: "-3",
    icon: Edit3,
    color: "text-yellow-400",
  },
  {
    title: "Hours Tracked",
    value: "24.5",
    change: "This Week",
    icon: Clock,
    color: "text-purple-400",
  },
]

const activeScripts = [
  {
    id: "1",
    title: "Brand Story - Nike Campaign",
    status: "in-review",
    deadline: "2024-01-15",
    client: "Nike",
    progress: 75,
    assignedTo: "You",
  },
  {
    id: "2",
    title: "Product Launch - Apple",
    status: "approved",
    deadline: "2024-01-20",
    client: "Apple",
    progress: 100,
    assignedTo: "You",
  },
  {
    id: "3",
    title: "Social Media Series - Starbucks",
    status: "pending",
    deadline: "2024-01-18",
    client: "Starbucks",
    progress: 25,
    assignedTo: "You",
  },
]

const todaySchedule = [
  {
    time: "09:00 AM",
    type: "Shoot",
    location: "Studio A",
    client: "Nike",
    duration: "4 hours",
  },
  {
    time: "02:00 PM",
    type: "Editing",
    location: "Edit Bay 3",
    client: "Apple",
    duration: "3 hours",
  },
  {
    time: "06:00 PM",
    type: "Review",
    location: "Conference Room",
    client: "Starbucks",
    duration: "1 hour",
  },
]

const pendingEdits = [
  {
    id: "1",
    title: "Nike Brand Story - Final Cut",
    priority: "high",
    estimatedTime: "2 hours",
    client: "Nike",
    notes: "Client requested faster cuts and more dynamic transitions",
  },
  {
    id: "2",
    title: "Apple Product Demo - Color Grade",
    priority: "medium",
    estimatedTime: "1.5 hours",
    client: "Apple",
    notes: "Match brand color palette exactly",
  },
]

// Sample task data for MyTasksHub
const sampleTasks = [
  {
    id: "1",
    title: "Edit Nike Brand Story Final Cut",
    description: "Complete final editing for Nike brand campaign video",
    priority: "high" as const,
    status: "in-progress" as const,
    deadline: "2024-01-15",
    estimatedTime: "2 hours",
    project: "Nike Brand Campaign",
    client: "Nike",
    category: "Editing",
  },
  {
    id: "2",
    title: "Color Grade Apple Product Demo",
    description: "Apply color grading to match Apple brand guidelines",
    priority: "medium" as const,
    status: "pending" as const,
    deadline: "2024-01-16",
    estimatedTime: "1.5 hours",
    project: "Apple Product Launch",
    client: "Apple",
    category: "Color Grading",
  },
  {
    id: "3",
    title: "Shoot Starbucks Social Content",
    description: "Film behind-the-scenes content for social media",
    priority: "urgent" as const,
    status: "pending" as const,
    deadline: "2024-01-15",
    estimatedTime: "4 hours",
    project: "Starbucks Social Series",
    client: "Starbucks",
    category: "Filming",
  },
  {
    id: "4",
    title: "Review Client Feedback",
    description: "Review and implement client feedback on Nike video",
    priority: "high" as const,
    status: "pending" as const,
    deadline: "2024-01-14",
    estimatedTime: "1 hour",
    project: "Nike Brand Campaign",
    client: "Nike",
    category: "Review",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "in-review":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "pending":
      return "bg-blue-100 text-blue-800 border-blue-200"
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

export default function CreativeDashboard() {
  const handleStartTask = (taskId: string) => {
    console.log("Starting task:", taskId)
    // Implement task start logic
  }

  const handlePauseTask = (taskId: string) => {
    console.log("Pausing task:", taskId)
    // Implement task pause logic
  }

  const handleCompleteTask = (taskId: string) => {
    console.log("Completing task:", taskId)
    // Implement task completion logic
  }

  const handleViewTask = (taskId: string) => {
    console.log("Viewing task:", taskId)
    // Implement task view logic
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Creative Team Dashboard</h2>
          <p className="text-gray-400 mt-1">Manage your scripts, shoots, and editing workflow</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Start Timer
          </Button>
          <Button>
            <Edit3 className="w-4 h-4 mr-2" />
            New Script
          </Button>
        </div>
      </div>

      {/* My Tasks Hub */}
      <MyTasksHub
        tasks={sampleTasks}
        onStartTask={handleStartTask}
        onPauseTask={handlePauseTask}
        onCompleteTask={handleCompleteTask}
        onViewTask={handleViewTask}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {creativeStats.map((stat, index) => {
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
        {/* Active Scripts */}
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              My Active Scripts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeScripts.map((script) => (
                <div key={script.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{script.title}</h4>
                      <p className="text-sm text-gray-600">Client: {script.client}</p>
                    </div>
                    <Badge className={getStatusColor(script.status)}>
                      {script.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <p>Deadline: {script.deadline}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{script.progress}%</span>
                    </div>
                    <Progress value={script.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="text-center min-w-[80px]">
                    <p className="font-medium text-sm">{item.time}</p>
                    <p className="text-xs text-gray-500">{item.duration}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.type}</p>
                    <p className="text-sm text-gray-600">{item.client} - {item.location}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Edits Queue */}
      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Pending Edits Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingEdits.map((edit) => (
              <div key={edit.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{edit.title}</h4>
                    <p className="text-sm text-gray-600">Client: {edit.client}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(edit.priority)}>
                      {edit.priority}
                    </Badge>
                    <Badge variant="outline">
                      {edit.estimatedTime}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{edit.notes}</p>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Start Editing
                  </Button>
                  <Button size="sm" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Track Time
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
            <Palette className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              <span className="text-sm">New Script</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Camera className="w-6 h-6 mb-2" />
              <span className="text-sm">Shoot Setup</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Edit3 className="w-6 h-6 mb-2" />
              <span className="text-sm">Start Edit</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Clock className="w-6 h-6 mb-2" />
              <span className="text-sm">Time Tracker</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
