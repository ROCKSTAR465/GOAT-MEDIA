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
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Zap,
  Brain,
  TrendingUp,
  Target,
  Users,
  Bot,
  AlertTriangle,
  Settings,
  Activity,
  Sparkles,
  Trophy,
  Gauge,
  Star,
  Clock,
  ArrowRight
} from "lucide-react"

export default function AIInsightsPage() {
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
    setTimeout(() => setDataLoaded(true), 800)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/login")
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
              <p className="mt-4 text-muted-foreground">Loading AI insights...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const insights = [
    {
      type: "optimization",
      title: "Team Workload Optimization Opportunity",
      description: "David Kim is 120% overallocated. Redistributing 2 projects could improve overall team efficiency by 15%.",
      impact: "High",
      timeToImplement: "5 minutes",
      expectedOutcome: "+15% team efficiency",
      action: "Auto-rebalance workload"
    },
    {
      type: "prediction",
      title: "Lead Conversion Rate Improvement",
      description: "AI analysis shows TechFlow Solutions has 89% conversion probability. Prioritizing outreach could secure $50K deal.",
      impact: "High",
      timeToImplement: "2 hours",
      expectedOutcome: "$50K revenue",
      action: "Priority outreach sequence"
    },
    {
      type: "warning",
      title: "Content Performance Declining",
      description: "Instagram engagement dropped 12% this week. AI recommends shifting to video content format for better performance.",
      impact: "Medium",
      timeToImplement: "1 day",
      expectedOutcome: "+25% engagement",
      action: "Update content strategy"
    },
    {
      type: "success",
      title: "Strategy Research Bot Performance",
      description: "AI has identified 3 new market opportunities with 78% success probability. Implementation could yield 40% growth.",
      impact: "High",
      timeToImplement: "3 days",
      expectedOutcome: "+40% market expansion",
      action: "Implement strategy recommendations"
    }
  ]

  const aiMetrics = [
    { name: "Decision Accuracy", value: 96.8, trend: "+2.3%" },
    { name: "Automation Rate", value: 89.2, trend: "+5.1%" },
    { name: "Prediction Confidence", value: 94.5, trend: "+1.8%" },
    { name: "Learning Efficiency", value: 87.3, trend: "+8.2%" }
  ]

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative overflow-x-hidden">
          <Meteors number={20} />
          
          <DashboardEntrance isVisible={dataLoaded}>
            <div className="space-y-6 relative z-10">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <div className="p-2 bg-accent text-accent-foreground rounded-lg">
                  <Zap className="h-6 w-6" />
                </div>
                AI Insights
              </h1>
              <p className="text-muted-foreground">
                Advanced AI-powered recommendations and predictive analytics for optimal system performance
              </p>
            </div>

            {/* AI Performance Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
              {aiMetrics.map((metric, idx) => (
                <Card key={idx} className={idx === 0 ? "relative overflow-hidden" : ""}>
                  {idx === 0 && <BorderBeam duration={10} size={80} colorFrom="#ebde10" colorTo="#f5ed6b" />}
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.name}</p>
                        <p className="text-2xl font-bold">
                          <NumberTicker value={metric.value} />%
                        </p>
                        <p className="text-xs text-accent">{metric.trend}</p>
                      </div>
                      <Brain className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Insights Tabs */}
            <Tabs defaultValue="recommendations" className="space-y-4">
              <TabsList>
                <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
                <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
                <TabsTrigger value="learning">AI Learning Progress</TabsTrigger>
                <TabsTrigger value="automation">Automation Opportunities</TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="grid gap-4">
                  {insights.map((insight, idx) => (
                    <Card key={idx} className="relative overflow-hidden">
                      {insight.impact === "High" && (
                        <BorderBeam duration={8} size={70} colorFrom="#00ff88" colorTo="#0088ff" />
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`p-2 rounded-lg ${
                                insight.type === 'optimization' ? 'bg-accent/10 text-accent' :
                                insight.type === 'prediction' ? 'bg-accent/10 text-accent' :
                                insight.type === 'warning' ? 'bg-destructive/10 text-destructive' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {insight.type === 'optimization' && <Target className="h-4 w-4" />}
                                {insight.type === 'prediction' && <TrendingUp className="h-4 w-4" />}
                                {insight.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                                {insight.type === 'success' && <Star className="h-4 w-4" />}
                              </div>
                              <div>
                                <h3 className="font-semibold">{insight.title}</h3>
                                <Badge variant={insight.impact === "High" ? "default" : "secondary"}>
                                  {insight.impact} Impact
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>
                            
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Time to Implement</p>
                                <p className="text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {insight.timeToImplement}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Expected Outcome</p>
                                <p className="text-green-600">{insight.expectedOutcome}</p>
                              </div>
                              <div>
                                <p className="font-medium">AI Confidence</p>
                                <p className="text-blue-600">{Math.floor(Math.random() * 15) + 85}%</p>
                              </div>
                            </div>
                          </div>
                          
                          <Button className="ml-4">
                            {insight.action}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="predictions" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Revenue Predictions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next 30 Days</span>
                          <span className="font-bold text-green-600">$125K (+18%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next 60 Days</span>
                          <span className="font-bold text-blue-600">$285K (+35%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next 90 Days</span>
                          <span className="font-bold text-purple-600">$450K (+52%)</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          AI Confidence: <span className="font-medium text-green-600">92.3%</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Team Performance Forecast
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Productivity Trend</span>
                          <span className="font-bold text-green-600">↗ +12%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Capacity Utilization</span>
                          <span className="font-bold text-blue-600">85% optimal</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Skill Development</span>
                          <span className="font-bold text-purple-600">+8 certifications</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="learning" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI Learning & Model Improvements
                    </CardTitle>
                    <CardDescription>
                      Track how your AI systems are continuously improving and learning from data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { component: "Lead Qualification AI", accuracy: 96.8, improvement: "+3.2%", learningPoints: 15247 },
                        { component: "Content Generation AI", accuracy: 94.1, improvement: "+5.7%", learningPoints: 12891 },
                        { component: "Strategy Analysis AI", accuracy: 92.5, improvement: "+2.9%", learningPoints: 8934 },
                        { component: "Feedback Processing AI", accuracy: 89.7, improvement: "+7.1%", learningPoints: 11205 }
                      ].map((model, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                              <Bot className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{model.component}</h3>
                              <p className="text-sm text-muted-foreground">
                                {model.learningPoints.toLocaleString()} learning data points
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{model.accuracy}% accuracy</p>
                            <p className="text-sm text-green-600">{model.improvement} this month</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="automation" className="space-y-4">
                <div className="grid gap-4">
                  {[
                    {
                      title: "Automated Lead Scoring",
                      description: "AI can automatically score and route leads based on conversion probability",
                      currentAutomation: 78,
                      potentialAutomation: 95,
                      timeSaved: "12 hours/week"
                    },
                    {
                      title: "Content Scheduling Optimization",
                      description: "AI can optimize posting times and content types for maximum engagement",
                      currentAutomation: 65,
                      potentialAutomation: 88,
                      timeSaved: "8 hours/week"
                    },
                    {
                      title: "Team Task Assignment",
                      description: "Intelligent task routing based on skills, capacity, and performance",
                      currentAutomation: 45,
                      potentialAutomation: 82,
                      timeSaved: "15 hours/week"
                    }
                  ].map((opportunity, idx) => (
                    <Card key={idx} className={idx === 0 ? "relative overflow-hidden" : ""}>
                      {idx === 0 && <BorderBeam duration={12} size={90} colorFrom="#ff6b6b" colorTo="#4ecdc4" />}
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{opportunity.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{opportunity.description}</p>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm">Current Automation</span>
                                  <span className="text-sm font-medium">{opportunity.currentAutomation}%</span>
                                </div>
                                <Progress value={opportunity.currentAutomation} />
                              </div>
                              
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm">Potential Automation</span>
                                  <span className="text-sm font-medium text-green-600">{opportunity.potentialAutomation}%</span>
                                </div>
                                <Progress value={opportunity.potentialAutomation} />
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-6 text-right">
                            <div className="p-3 bg-green-50 rounded-lg">
                              <p className="text-sm font-medium text-green-600">Time Savings</p>
                              <p className="text-lg font-bold text-green-700">{opportunity.timeSaved}</p>
                            </div>
                            <Button className="mt-3 w-full" size="sm">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Enable AI
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          </DashboardEntrance>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
