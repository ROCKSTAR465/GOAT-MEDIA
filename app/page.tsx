"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { motion } from "framer-motion"
import { 
  Palette, 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowRight,
  Mountain
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated === 'true') {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          const roleRoutes = {
            creative: '/dashboard/creative',
            manager: '/dashboard/manager',
            social: '/dashboard/social',
            finance: '/dashboard/finance'
          }
          
          if (roleRoutes[user.role as keyof typeof roleRoutes]) {
            router.push(roleRoutes[user.role as keyof typeof roleRoutes])
          }
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    }
  }, [router])

  const roles = [
    {
      title: "Creative Team",
      description: "Writers, Editors, Designers, Videographers",
      icon: Palette,
      color: "text-blue-500",
      features: ["Script Management", "Shoot Scheduling", "Editing Queue", "Time Tracking"],
      route: "/login"
    },
    {
      title: "Project Manager",
      description: "Team Leaders & Project Coordinators",
      icon: Users,
      color: "text-green-500",
      features: ["Team Overview", "Project Timelines", "Resource Allocation", "Client Management"],
      route: "/login"
    },
    {
      title: "Social Media Manager",
      description: "Content Creators & Platform Managers",
      icon: Calendar,
      color: "text-purple-500",
      features: ["Publishing Calendar", "Content Analytics", "Hashtag Management", "Multi-Platform"],
      route: "/login"
    },
    {
      title: "Finance Team",
      description: "Budget Analysts & Account Managers",
      icon: DollarSign,
      color: "text-orange-500",
      features: ["Budget Tracking", "Payment Monitoring", "Cost Analysis", "Financial Reports"],
      route: "/login"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <div className="flex aspect-square size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Mountain className="size-8" />
            </div>
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            The GOAT Media
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Employee Dashboard System - Role-based access to personalized workflows, 
            task management, and performance analytics for every team member.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {roles.map((role, index) => {
            const Icon = role.icon
            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="relative h-full border-2 hover:border-primary/50 transition-colors">
                  <BorderBeam />
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-full bg-secondary ${role.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{role.title}</CardTitle>
                        <p className="text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {role.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          className="w-full" 
                          onClick={() => router.push(role.route)}
                        >
                          Access Dashboard
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto border-2">
            <BorderBeam />
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Choose your role above to access your personalized dashboard, or click below to go directly to the login page.
              </p>
              <Button 
                size="lg" 
                onClick={() => router.push('/login')}
                className="px-8"
              >
                Go to Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
