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
  Brain, 
  TrendingUp, 
  Target, 
  Search,
  BarChart3,
  Users,
  Eye,
  Star,
  AlertTriangle,
  CheckCircle,
  Building,
  Zap,
  FileText,
  Lightbulb
} from "lucide-react"

// Demo API function for strategy research data
const fetchStrategyData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1300))
  
  return {
    todayStats: {
      reportsGenerated: 8,
      competitorsAnalyzed: 15,
      trendsIdentified: 23,
      opportunitiesFound: 12
    },
    recentResearch: [
      {
        id: 1,
        title: "AI Automation Market Analysis Q4 2025",
        type: "Market Research",
        client: "TechCorp Solutions",
        status: "Completed",
        insights: 47,
        trends: 12,
        opportunities: 8,
        createdAt: "2 hours ago",
        keyFindings: [
          "67% increase in AI adoption across SMBs",
          "Marketing automation ROI averages 300%",
          "Content generation tools show highest growth"
        ],
        competitorGaps: [
          "Limited mid-market focus",
          "Weak social media integration",
          "High pricing for small businesses"
        ],
        recommendations: [
          "Target SMB segment with affordable packages",
          "Develop social media automation features",
          "Create freemium model for market entry"
        ]
      },
      {
        id: 2,
        title: "Digital Marketing Trends 2025",
        type: "Trend Analysis",
        client: "Growth Labs",
        status: "In Progress",
        insights: 23,
        trends: 8,
        opportunities: 5,
        createdAt: "1 day ago",
        keyFindings: [
          "Video content dominates social engagement",
          "AI personalization increases conversions by 45%",
          "Voice search optimization becoming critical"
        ],
        competitorGaps: [
          "Limited video automation tools",
          "Basic personalization capabilities",
          "No voice search optimization"
        ],
        recommendations: [
          "Develop video content automation",
          "Enhance AI personalization engine",
          "Add voice search optimization features"
        ]
      },
      {
        id: 3,
        title: "Competitor Brand Analysis: DigitalFlow",
        type: "Brand Intelligence",
        client: "Innovation Works",
        status: "Scheduled",
        insights: 0,
        trends: 0,
        opportunities: 0,
        createdAt: "Scheduled for tomorrow",
        keyFindings: [],
        competitorGaps: [],
        recommendations: []
      }
    ],
    brandIntelligence: {
      currentClient: "TechCorp Solutions",
      brandHealth: 87,
      marketPosition: "Leader",
      competitiveAdvantage: "Innovation & Technology",
      threatLevel: "Low",
      opportunities: [
        "Expand into European markets",
        "Develop mobile-first solutions",
        "Partner with industry leaders"
      ]
    },
    competitorAnalysis: [
      {
        name: "AutomateFlow",
        marketShare: 23,
        strengths: ["Enterprise focus", "Advanced analytics"],
        weaknesses: ["High pricing", "Complex setup"],
        threat: "Medium"
      },
      {
        name: "SmartMarketing Pro",
        marketShare: 18,
        strengths: ["User-friendly", "Good support"],
        weaknesses: ["Limited AI features", "Basic reporting"],
        threat: "Low"
      },
      {
        name: "AI Marketing Suite",
        marketShare: 15,
        strengths: ["Strong AI", "Comprehensive features"],
        weaknesses: ["Poor UX", "Expensive"],
        threat: "High"
      }
    ]
  }
}

export default function StrategyResearchPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [strategyData, setStrategyData] = useState<{
    todayStats: any;
    recentResearch: any[];
    competitorAnalysis: any[];
    brandIntelligence: any;
  } | null>(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
    
    // Load strategy data
    fetchStrategyData().then(data => {
      setStrategyData(data)
      setDataLoaded(true)
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null
  }

  if (!isAuthenticated || !dataLoaded || !strategyData) {
    return (
      <SidebarProvider>
        <AppSidebar onLogout={handleLogout} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading strategy research data...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'default'
      case 'In Progress': return 'secondary'
      case 'Scheduled': return 'outline'
      default: return 'outline'
    }
  }

  const getThreatColor = (threat: string) => {
    switch(threat) {
      case 'High': return 'destructive'
      case 'Medium': return 'secondary'
      case 'Low': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative overflow-x-hidden">
          <Meteors number={35} />
          
          <DashboardEntrance isVisible={dataLoaded}>
            <div className="space-y-6 relative z-10">
            <div>
              <h1 className="text-3xl font-bold">Strategy Research Bot</h1>
              <p className="text-muted-foreground">
                AI-powered business intelligence and strategic planning with comprehensive market analysis
              </p>
            </div>

            {/* Today's Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="relative overflow-hidden">
                <BorderBeam duration={12} size={90} />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Reports Generated</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={strategyData.todayStats.reportsGenerated} />
                      </p>
                      <p className="text-xs text-accent">+25% from yesterday</p>
                    </div>
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Competitors Analyzed</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={strategyData.todayStats.competitorsAnalyzed} />
                      </p>
                      <p className="text-xs text-accent">+33% from yesterday</p>
                    </div>
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <BorderBeam duration={15} size={100} />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Trends Identified</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={strategyData.todayStats.trendsIdentified} />
                      </p>
                      <p className="text-xs text-accent">+40% from yesterday</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Opportunities Found</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={strategyData.todayStats.opportunitiesFound} />
                      </p>
                      <p className="text-xs text-accent">+50% from yesterday</p>
                    </div>
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strategy Research Tabs */}
            <Tabs defaultValue="research" className="space-y-4">
              <TabsList>
                <TabsTrigger value="research">Recent Research</TabsTrigger>
                <TabsTrigger value="brand">Brand Intelligence</TabsTrigger>
                <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="research" className="space-y-4">
                <div className="grid gap-4">
                  {strategyData.recentResearch.map((research: {
                    id: string;
                    title: string;
                    type: string;
                    status: string;
                    progress: number;
                    findings: string;
                    priority: string;
                    dueDate: string;
                    insights: number;
                    trends: number;
                    opportunities: number;
                    tags: string[];
                    client: string;
                    createdAt: string;
                    keyFindings: string[];
                    competitorGaps: string[];
                    recommendations: string[];
                  }) => (
                    <Card key={research.id} className="relative overflow-hidden">
                      {research.status === 'Completed' && (
                        <BorderBeam duration={10} size={80} />
                      )}
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Brain className="h-5 w-5 text-accent" />
                                <h3 className="font-semibold">{research.title}</h3>
                                <Badge variant={getStatusColor(research.status)}>
                                  {research.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {research.type} • {research.client} • {research.createdAt}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View Report
                              </Button>
                              <Button variant="outline" size="sm">
                                <Search className="h-4 w-4 mr-1" />
                                Deep Dive
                              </Button>
                            </div>
                          </div>

                          {/* Metrics */}
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex items-center justify-center p-4 border rounded-lg">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-accent">
                                  <NumberTicker value={research.insights} />
                                </p>
                                <p className="text-sm text-muted-foreground">Insights</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-4 border rounded-lg">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-accent">
                                  <NumberTicker value={research.trends} />
                                </p>
                                <p className="text-sm text-muted-foreground">Trends</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-4 border rounded-lg">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-accent">
                                  <NumberTicker value={research.opportunities} />
                                </p>
                                <p className="text-sm text-muted-foreground">Opportunities</p>
                              </div>
                            </div>
                          </div>

                          {research.status === 'Completed' && (
                            <div className="grid md:grid-cols-3 gap-4">
                              {/* Key Findings */}
                              <div className="space-y-2">
                                <h4 className="font-medium flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4 text-accent" />
                                  Key Findings
                                </h4>
                                <ul className="space-y-1">
                                  {research.keyFindings.map((finding: string, idx: number) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                      <CheckCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                                      {finding}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Competitor Gaps */}
                              <div className="space-y-2">
                                <h4 className="font-medium flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                                  Competitor Gaps
                                </h4>
                                <ul className="space-y-1">
                                  {research.competitorGaps.map((gap: string, idx: number) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                      <Target className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                                      {gap}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Recommendations */}
                              <div className="space-y-2">
                                <h4 className="font-medium flex items-center gap-2">
                                  <Star className="h-4 w-4 text-accent" />
                                  Recommendations
                                </h4>
                                <ul className="space-y-1">
                                  {research.recommendations.map((rec: string, idx: number) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                      <Zap className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="brand" className="space-y-4">
                <Card className="relative overflow-hidden">
                  <BorderBeam duration={18} size={120} />
                  <CardHeader>
                    <CardTitle>Brand Intelligence Dashboard</CardTitle>
                    <CardDescription>
                      Comprehensive brand analysis for {strategyData.brandIntelligence.currentClient}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Brand Health Overview */}
                    <div className="grid md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Brand Health</p>
                            <p className="text-3xl font-bold text-accent">
                              <NumberTicker value={strategyData.brandIntelligence.brandHealth} />%
                            </p>
                            <Progress value={strategyData.brandIntelligence.brandHealth} />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Market Position</p>
                            <Badge variant="default" className="text-lg px-3 py-1">
                              {strategyData.brandIntelligence.marketPosition}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Competitive Advantage</p>
                            <p className="text-sm font-medium">
                              {strategyData.brandIntelligence.competitiveAdvantage}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Threat Level</p>
                            <Badge variant="outline" className="text-lg px-3 py-1">
                              {strategyData.brandIntelligence.threatLevel}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Strategic Opportunities */}
                    <div>
                      <h3 className="font-semibold mb-3">Strategic Opportunities</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {strategyData.brandIntelligence.opportunities.map((opportunity: string, idx: number) => (
                          <Card key={idx}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Target className="h-5 w-5 text-accent mt-0.5" />
                                <p className="text-sm">{opportunity}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="competitors" className="space-y-4">
                <div className="grid gap-4">
                  {strategyData.competitorAnalysis.map((competitor: {
                    name: string;
                    position: string;
                    strengths: string[];
                    weaknesses: string[];
                    marketShare: number;
                    threat: string;
                    opportunities: string[];
                  }, idx: number) => (
                    <Card key={idx} className="relative overflow-hidden">
                      {competitor.threat === 'High' && (
                        <BorderBeam duration={8} size={60} />
                      )}
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-4 gap-6">
                          {/* Competitor Info */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Building className="h-5 w-5 text-blue-500" />
                              <h3 className="font-semibold">{competitor.name}</h3>
                              <Badge variant={getThreatColor(competitor.threat)}>
                                {competitor.threat} Threat
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Market Share</span>
                                <span className="text-sm font-medium">{competitor.marketShare}%</span>
                              </div>
                              <Progress value={competitor.marketShare} />
                            </div>
                          </div>

                          {/* Strengths */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-accent">Strengths</h4>
                            <ul className="space-y-1">
                              {competitor.strengths.map((strength: string, i: number) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <CheckCircle className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Weaknesses */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-red-600">Weaknesses</h4>
                            <ul className="space-y-1">
                              {competitor.weaknesses.map((weakness: string, i: number) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Actions */}
                          <div className="space-y-3">
                            <h4 className="font-medium">Analysis Actions</h4>
                            <div className="space-y-2">
                              <Button variant="outline" className="w-full" size="sm">
                                <Search className="h-4 w-4 mr-2" />
                                Deep Analysis
                              </Button>
                              <Button variant="outline" className="w-full" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Monitor Changes
                              </Button>
                              <Button variant="outline" className="w-full" size="sm">
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Compare Features
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Market Growth Rate</span>
                          <span className="font-bold text-accent">
                            <NumberTicker value={23.4} />%
                          </span>
                        </div>
                        <Progress value={23.4} />
                        
                        <div className="flex items-center justify-between">
                          <span>AI Adoption Rate</span>
                          <span className="font-bold text-blue-600">
                            <NumberTicker value={67.8} />%
                          </span>
                        </div>
                        <Progress value={67.8} />
                        
                        <div className="flex items-center justify-between">
                          <span>Customer Satisfaction</span>
                          <span className="font-bold text-purple-600">
                            <NumberTicker value={84.2} />%
                          </span>
                        </div>
                        <Progress value={84.2} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Trend Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { trend: "AI-Powered Content", growth: 156 },
                          { trend: "Marketing Automation", growth: 89 },
                          { trend: "Predictive Analytics", growth: 112 },
                          { trend: "Social Media AI", growth: 203 }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.trend}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-accent">+{item.growth}%</span>
                              <Progress value={Math.min(item.growth / 2, 100)} className="w-16" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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
