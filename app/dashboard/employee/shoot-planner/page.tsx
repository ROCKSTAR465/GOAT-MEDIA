"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Shoot {
  id: string
  client: string
  type: string
  location: string
  time: string
  date: string
}

const initialShoots: Shoot[] = [
  {
    id: "1",
    client: "TechStart Solutions",
    type: "Brand Storytelling • Studio A",
    location: "Studio A",
    time: "11:00 AM",
    date: "2025-08-25",
  },
  {
    id: "2",
    client: "Digital Innovations",
    type: "Product Demo • Studio B",
    location: "Studio B",
    time: "3:00 PM",
    date: "2025-08-25",
  },
  {
    id: "3",
    client: "BrandBoost",
    type: "Interview Setup • Outdoor",
    location: "Outdoor",
    time: "6:00 PM",
    date: "2025-08-25",
  },
]

const equipmentData = [
  { name: "Camera Kit A", status: "available", location: "Studio A" },
  { name: "Camera Kit B", status: "in-use", location: "Studio B" },
  { name: "Lighting Setup", status: "available", location: "Storage" },
  { name: "Audio Equipment", status: "maintenance", location: "Tech Room" },
  { name: "Drone Kit", status: "available", location: "Storage" },
  { name: "Backup Equipment", status: "available", location: "Storage" },
]

export default function ShootSchedulePage() {
  const [shoots, setShoots] = useState<Shoot[]>(initialShoots)
  const [isAddShootModalOpen, setIsAddShootModalOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleAddShoot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newShoot: Shoot = {
      id: (shoots.length + 1).toString(),
      client: formData.get("client") as string,
      type: `${formData.get("type")} • ${formData.get("location")}`,
      location: formData.get("location") as string,
      time: formData.get("time") as string,
      date: formData.get("date") as string,
    }
    setShoots([...shoots, newShoot])
    setIsAddShootModalOpen(false)
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400"
      case "in-use":
        return "bg-yellow-500/20 text-yellow-400"
      case "maintenance":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calendar className="h-8 w-8" /> Shoot Schedule
          </h1>
          <p className="text-gray-400 mt-1">Manage video shoots and production calendar</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-semibold px-4">{formatMonth(currentDate)}</span>
            <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Dialog open={isAddShootModalOpen} onOpenChange={setIsAddShootModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Shoot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Shoot</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddShoot} className="space-y-4">
                <div>
                  <Label>Client</Label>
                  <Select name="client" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TechStart Solutions">TechStart Solutions</SelectItem>
                      <SelectItem value="Digital Innovations">Digital Innovations</SelectItem>
                      <SelectItem value="GrowthCorp">GrowthCorp</SelectItem>
                      <SelectItem value="BrandBoost">BrandBoost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Shoot Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shoot type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brand Storytelling">Brand Storytelling</SelectItem>
                      <SelectItem value="Product Demo">Product Demo</SelectItem>
                      <SelectItem value="Interview Setup">Interview Setup</SelectItem>
                      <SelectItem value="Testimonial">Testimonial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Location</Label>
                  <Select name="location" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Studio A">Studio A</SelectItem>
                      <SelectItem value="Studio B">Studio B</SelectItem>
                      <SelectItem value="Outdoor">Outdoor</SelectItem>
                      <SelectItem value="Client Office">Client Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Input name="date" type="date" required />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input name="time" type="time" required />
                </div>
                <Button type="submit" className="w-full">
                  Schedule Shoot
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {shoots.map((shoot, index) => (
          <Card key={shoot.id} className="relative">
            <BorderBeam delay={index * 0.2} />
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{shoot.client}</h3>
                    <Badge className="bg-blue-500/20 text-blue-400 border-0">Scheduled</Badge>
                  </div>
                  <p className="text-gray-400 mb-1">{shoot.type}</p>
                  <p className="text-sm text-gray-500">Location: {shoot.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{shoot.time}</p>
                  <p className="text-sm text-gray-400">{new Date(shoot.date).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle>Equipment Status</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {equipmentData.map((equipment, index) => (
            <div key={index} className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{equipment.name}</h4>
                <Badge className={`${getEquipmentStatusColor(equipment.status)} border-0`}>
                  {equipment.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-400">{equipment.location}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
