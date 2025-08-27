"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NumberTicker } from "@/components/ui/number-ticker"
import { BorderBeam } from "@/components/ui/border-beam"
import { Meteors } from "@/components/ui/meteors"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { DashboardEntrance } from "@/components/dashboard/loading-animation"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  ArrowUpRight,
  Activity,
  Brain,
  Bot
} from "lucide-react"

export default function PerformanceAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
    
    // Simulate loading
    setTimeout(() => setDataLoaded(true), 1200)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null
  }

  if (!isAuthenticated || !dataLoaded) {
    return (
      <SidebarProvider>
        <AppSidebar onLogout={handleLogout} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading performance analytics...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative overflow-x-hidden">
          <Meteors number={15} />
          
          <DashboardEntrance isVisible={dataLoaded}>
            <div className="space-y-6 relative z-10">
            <div>
              <h1 className="text-3xl font-bold">Performance Analytics</h1>
              <p className="text-muted-foreground">
                Advanced metrics and insights across your entire SNR AI automation platform
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="relative overflow-hidden">
                <BorderBeam duration={10} size={80} colorFrom="#00ff88" colorTo="#0088ff" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">
                        $<NumberTicker value={247500} />
                      </p>
                      <p className="text-xs text-accent flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +23.5% this month
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={94.2} />%
                      </p>
                      <p className="text-xs text-accent flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +2.8% improvement
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <BorderBeam duration={12} size={90} colorFrom="#ebde10" colorTo="#f5ed6b" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Task Efficiency</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={87.6} />%
                      </p>
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        -1.2% vs target
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">AI Accuracy</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={96.8} />%
                      </p>
                      <p className="text-xs text-accent flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Industry leading
                      </p>
                    </div>
                    <Brain className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="components">Component Performance</TabsTrigger>
                <TabsTrigger value="clients">Client Metrics</TabsTrigger>
                <TabsTrigger value="trends">Trends & Forecasting</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Trends (30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lead Conversion Rate</span>
                          <span className="text-sm font-medium">24.3%</span>
                        </div>
                        <Progress value={24.3} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Content Engagement</span>
                          <span className="text-sm font-medium">78.9%</span>
                        </div>
                        <Progress value={78.9} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Team Productivity</span>
                          <span className="text-sm font-medium">92.1%</span>
                        </div>
                        <Progress value={92.1} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">System Uptime</span>
                          <span className="text-sm font-medium">99.7%</span>
                        </div>
                        <Progress value={99.7} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Key Performance Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-2xl font-bold text-accent">
                            <NumberTicker value={156} />
                          </p>
                          <p className="text-sm text-muted-foreground">New Clients</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-2xl font-bold">
                            <NumberTicker value={2847} />
                          </p>
                          <p className="text-sm text-muted-foreground">Tasks Completed</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-2xl font-bold">
                            <NumberTicker value={89} />%
                          </p>
                          <p className="text-sm text-muted-foreground">AI Automation</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-2xl font-bold text-accent">
                            <NumberTicker value={4.8} />
                          </p>
                          <p className="text-sm text-muted-foreground">Avg Rating</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="components" className="space-y-4">
                <div className="grid gap-4">
                  {[
                    { name: "Lead Qualifier Bot", performance: 94.2, status: "Excellent", trend: "+5.3%" },
                    { name: "Content Creation Bot", performance: 88.7, status: "Good", trend: "+2.1%" },
                    { name: "Team Status Tracker", performance: 96.1, status: "Excellent", trend: "+1.8%" },
                    { name: "Strategy Research Bot", performance: 91.4, status: "Good", trend: "+4.2%" },
                    { name: "Feedback Analysis Bot", performance: 89.6, status: "Good", trend: "-0.7%" }
                  ].map((component, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Bot className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{component.name}</h3>
                              <p className="text-sm text-muted-foreground">Performance Score: {component.performance}%</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={component.status === "Excellent" ? "default" : "secondary"}>
                              {component.status}
                            </Badge>
                            <div className="text-right">
                              <p className="font-medium">{component.trend}</p>
                              <p className="text-sm text-muted-foreground">vs last month</p>
                            </div>
                            <Progress value={component.performance} className="w-24" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="clients" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Retention</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-accent">
                          <NumberTicker value={96.8} />%
                        </p>
                        <p className="text-sm text-muted-foreground">30-day retention rate</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Average Project Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold">
                          $<NumberTicker value={45200} />
                        </p>
                        <p className="text-sm text-muted-foreground">Per client engagement</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Client Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-accent">
                          +<NumberTicker value={28} />%
                        </p>
                        <p className="text-sm text-muted-foreground">Month over month</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Predictive Analytics & Forecasting</CardTitle>
                    <CardDescription>
                      AI-powered insights and predictions for the next 90 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-semibold">Projected Growth</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Revenue (Q1 2025)</span>
                              <span className="font-medium">$425K (+72%)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">New Clients</span>
                              <span className="font-medium">+145 clients</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Team Efficiency</span>
                              <span className="font-medium">94.2% (+6.5%)</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold">Risk Indicators</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              <span className="text-sm">System Performance: Low Risk</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-destructive rounded-full"></div>
                              <span className="text-sm">Capacity Planning: Medium Risk</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              <span className="text-sm">Client Satisfaction: Low Risk</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          </DashboardEntrance>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
