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
  TrendingUp, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  CheckCircle,
  Star,
  RefreshCw,
  Zap,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Clock,
  Target,
  TrendingDown
} from "lucide-react"

// Demo API function for feedback data
const fetchFeedbackData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    todayStats: {
      feedbackProcessed: 1247,
      sentimentScore: 8.4,
      strategiesOptimized: 23,
      performanceImprovement: 15.7
    },
    recentFeedback: [
      {
        id: 1,
        platform: "Instagram",
        content: "Amazing automation tools! Our team productivity increased by 200% in just 2 weeks. The AI content generation is incredibly accurate and saves us hours daily.",
        sentiment: "positive",
        score: 0.92,
        engagement: { likes: 156, comments: 23, shares: 34 },
        timestamp: "2 hours ago",
        client: "TechCorp Solutions",
        actionTaken: "Feature highlight in next campaign",
        insights: ["Productivity gains resonate", "Content generation is key differentiator", "Time savings valuable"]
      },
      {
        id: 2,
        platform: "LinkedIn",
        content: "The lead qualification bot is good but sometimes misses nuanced industry context. Could benefit from more customization options for niche markets.",
        sentiment: "neutral",
        score: 0.15,
        engagement: { likes: 45, comments: 12, shares: 3 },
        timestamp: "4 hours ago",
        client: "Growth Labs",
        actionTaken: "Enhance industry customization",
        insights: ["Need better industry context", "Customization is important", "Niche market focus required"]
      },
      {
        id: 3,
        platform: "Twitter",
        content: "Disappointed with the customer support response time. The AI tools are great but getting help when needed is frustrating. 3 days for a simple question is too long.",
        sentiment: "negative",
        score: -0.76,
        engagement: { likes: 23, comments: 45, shares: 12 },
        timestamp: "6 hours ago",
        client: "Innovation Works",
        actionTaken: "Improve support response time",
        insights: ["Support response time critical", "Great product overshadowed", "Customer expectations high"]
      },
      {
        id: 4,
        platform: "Facebook",
        content: "Love the social media automation features! Posted 50 pieces of content this week with minimal effort. The brand voice consistency is impressive.",
        sentiment: "positive",
        score: 0.87,
        engagement: { likes: 89, comments: 16, shares: 28 },
        timestamp: "1 day ago",
        client: "Digital Dynamics",
        actionTaken: "Showcase automation capabilities",
        insights: ["Automation volume appreciated", "Brand consistency valued", "Efficiency gains clear"]
      }
    ],
    performanceMetrics: [
      {
        metric: "Content Engagement",
        current: 4.2,
        previous: 3.8,
        trend: "up",
        improvement: 10.5
      },
      {
        metric: "Conversion Rate",
        current: 12.4,
        previous: 11.2,
        trend: "up",
        improvement: 10.7
      },
      {
        metric: "Customer Satisfaction",
        current: 8.4,
        previous: 8.1,
        trend: "up",
        improvement: 3.7
      },
      {
        metric: "Response Time",
        current: 2.3,
        previous: 4.1,
        trend: "down",
        improvement: 43.9
      }
    ],
    strategyAdjustments: [
      {
        area: "Content Strategy",
        adjustment: "Increase focus on productivity and time-saving benefits",
        impact: "High",
        implementation: "This week"
      },
      {
        area: "Customer Support",
        adjustment: "Implement 24/7 AI chatbot for immediate responses",
        impact: "Critical",
        implementation: "Immediate"
      },
      {
        area: "Lead Qualification",
        adjustment: "Add industry-specific customization options",
        impact: "Medium",
        implementation: "Next sprint"
      },
      {
        area: "Social Media",
        adjustment: "Highlight automation volume capabilities more prominently",
        impact: "Medium",
        implementation: "This week"
      }
    ]
  }
}

export default function FeedbackAnalysisPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [feedbackData, setFeedbackData] = useState<{
    todayStats: any;
    recentFeedback: any[];
    performanceMetrics: any[];
    strategyAdjustments: any[];
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
    
    // Load feedback data
    fetchFeedbackData().then(data => {
      setFeedbackData(data)
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

  if (!isAuthenticated || !dataLoaded || !feedbackData) {
    return (
      <SidebarProvider>
        <AppSidebar onLogout={handleLogout} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading feedback analysis data...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return 'default'
      case 'neutral': return 'secondary'
      case 'negative': return 'destructive'
      default: return 'secondary'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return <ThumbsUp className="h-4 w-4" />
      case 'neutral': return <MessageSquare className="h-4 w-4" />
      case 'negative': return <ThumbsDown className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'Instagram': return <Instagram className="h-4 w-4" />
      case 'LinkedIn': return <Linkedin className="h-4 w-4" />
      case 'Twitter': return <Twitter className="h-4 w-4" />
      case 'Facebook': return <Facebook className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'Critical': return 'destructive'
      case 'High': return 'default'
      case 'Medium': return 'secondary'
      case 'Low': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative overflow-x-hidden">
          <Meteors number={25} />
          
          <DashboardEntrance isVisible={dataLoaded}>
            <div className="space-y-6 relative z-10">
            <div>
              <h1 className="text-3xl font-bold">Feedback Loop Strategy Bot</h1>
              <p className="text-muted-foreground">
                AI-powered performance optimization through continuous feedback analysis and strategy refinement
              </p>
            </div>

            {/* Today's Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="relative overflow-hidden">
                <BorderBeam duration={14} size={95} />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Feedback Processed</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={feedbackData.todayStats.feedbackProcessed} />
                      </p>
                      <p className="text-xs text-accent">+18% from yesterday</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sentiment Score</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={feedbackData.todayStats.sentimentScore} />
                      </p>
                      <p className="text-xs text-accent">+0.3 from yesterday</p>
                    </div>
                    <Star className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <BorderBeam duration={12} size={85} />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Strategies Optimized</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={feedbackData.todayStats.strategiesOptimized} />
                      </p>
                      <p className="text-xs text-accent">+35% from yesterday</p>
                    </div>
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Performance +</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={feedbackData.todayStats.performanceImprovement} />%
                      </p>
                      <p className="text-xs text-accent">This week&apos;s improvement</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Analysis Tabs */}
            <Tabs defaultValue="feedback" className="space-y-4">
              <TabsList>
                <TabsTrigger value="feedback">Recent Feedback</TabsTrigger>
                <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
                <TabsTrigger value="strategies">Strategy Adjustments</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="feedback" className="space-y-4">
                <div className="grid gap-4">
                  {feedbackData.recentFeedback.map((feedback: {
                    id: string;
                    platform: string;
                    content: string;
                    sentiment: string;
                    engagement: { likes: number; comments: number; shares: number };
                    aiScore: number;
                    score: number;
                    timestamp: string;
                    client: string;
                    actionTaken: string;
                    insights: string[];
                  }) => (
                    <Card key={feedback.id} className="relative overflow-hidden">
                      {feedback.sentiment === 'positive' && (
                        <BorderBeam duration={10} size={80} />
                      )}
                      {feedback.sentiment === 'negative' && (
                        <BorderBeam duration={6} size={60} />
                      )}
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                {getPlatformIcon(feedback.platform)}
                                <span className="font-medium">{feedback.platform}</span>
                                <Badge variant={getSentimentColor(feedback.sentiment)}>
                                  {getSentimentIcon(feedback.sentiment)}
                                  {feedback.sentiment}
                                </Badge>
                                <Badge variant="outline">
                                  Score: {(feedback.score > 0 ? '+' : '')}{feedback.score.toFixed(2)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {feedback.client} • {feedback.timestamp}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Analyze
                              </Button>
                              <Button variant="outline" size="sm">
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Process
                              </Button>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="text-sm">{feedback.content}</p>
                          </div>

                          {/* Metrics and Insights */}
                          <div className="grid md:grid-cols-3 gap-4">
                            {/* Engagement */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Engagement</h4>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                  <p className="text-lg font-bold">{feedback.engagement.likes}</p>
                                  <p className="text-xs text-muted-foreground">Likes</p>
                                </div>
                                <div>
                                  <p className="text-lg font-bold">{feedback.engagement.comments}</p>
                                  <p className="text-xs text-muted-foreground">Comments</p>
                                </div>
                                <div>
                                  <p className="text-lg font-bold">{feedback.engagement.shares}</p>
                                  <p className="text-xs text-muted-foreground">Shares</p>
                                </div>
                              </div>
                            </div>

                            {/* Action Taken */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Action Taken</h4>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-accent" />
                                <span className="text-sm">{feedback.actionTaken}</span>
                              </div>
                            </div>

                            {/* Key Insights */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Key Insights</h4>
                              <ul className="space-y-1">
                                {feedback.insights.map((insight: string, idx: number) => (
                                  <li key={idx} className="text-sm flex items-start gap-2">
                                    <Zap className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                                    {insight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {feedbackData.performanceMetrics.map((metric: {
                    metric: string;
                    value: number;
                    change: number;
                    trend: string;
                    target: number;
                    improvement: number;
                    current: number;
                    previous: number;
                  }, idx: number) => (
                    <Card key={idx} className="relative overflow-hidden">
                      {metric.trend === 'up' && idx < 2 && (
                        <BorderBeam duration={15} size={100} />
                      )}
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {metric.metric}
                          <div className="flex items-center gap-2">
                            {metric.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-accent" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-muted-foreground" />
                            )}
                            <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'}>
                              {metric.improvement > 0 ? '+' : ''}{metric.improvement.toFixed(1)}%
                            </Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">
                              <NumberTicker value={metric.current} />
                              {metric.metric === 'Customer Satisfaction' ? '/10' : metric.metric === 'Response Time' ? ' min' : '%'}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Previous: {metric.previous}
                            </span>
                          </div>
                          <Progress 
                            value={metric.metric === 'Response Time' ? 100 - (metric.current * 10) : metric.current * 10} 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>
                      Weekly performance analysis across all key metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-accent">
                          <NumberTicker value={23.4} />%
                        </p>
                        <p className="text-sm text-muted-foreground">Overall Improvement</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-accent">
                          <NumberTicker value={156} />
                        </p>
                        <p className="text-sm text-muted-foreground">Optimizations Made</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-accent">
                          <NumberTicker value={89.2} />%
                        </p>
                        <p className="text-sm text-muted-foreground">Strategy Success Rate</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-2xl font-bold text-accent">
                          <NumberTicker value={2.3} />x
                        </p>
                        <p className="text-sm text-muted-foreground">Performance Multiplier</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="strategies" className="space-y-4">
                <div className="grid gap-4">
                  {feedbackData.strategyAdjustments.map((adjustment: {
                    title: string;
                    description: string;
                    impact: string;
                    timeline: string;
                    status: string;
                    progress: number;
                    area: string;
                    adjustment: string;
                    implementation: string;
                  }, idx: number) => (
                    <Card key={idx} className="relative overflow-hidden">
                      {adjustment.impact === 'Critical' && (
                        <BorderBeam duration={8} size={60} />
                      )}
                      {adjustment.impact === 'High' && (
                        <BorderBeam duration={12} size={80} />
                      )}
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-4 gap-6">
                          {/* Area */}
                          <div className="space-y-2">
                            <h4 className="font-medium">Strategy Area</h4>
                            <div className="flex items-center gap-2">
                              <Target className="h-5 w-5 text-accent" />
                              <span className="font-semibold">{adjustment.area}</span>
                            </div>
                          </div>

                          {/* Adjustment */}
                          <div className="space-y-2 md:col-span-2">
                            <h4 className="font-medium">Required Adjustment</h4>
                            <p className="text-sm">{adjustment.adjustment}</p>
                          </div>

                          {/* Impact & Timeline */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Impact Level</h4>
                              <Badge variant={getImpactColor(adjustment.impact)}>
                                {adjustment.impact}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Implementation</h4>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{adjustment.implementation}</span>
                              </div>
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
                      <CardTitle>Sentiment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Positive Feedback</span>
                          <span className="font-bold text-green-600">
                            <NumberTicker value={68.4} />%
                          </span>
                        </div>
                        <Progress value={68.4} className="bg-green-100" />
                        
                        <div className="flex items-center justify-between">
                          <span>Neutral Feedback</span>
                          <span className="font-bold">
                            <NumberTicker value={23.1} />%
                          </span>
                        </div>
                        <Progress value={23.1} />
                        
                        <div className="flex items-center justify-between">
                          <span>Negative Feedback</span>
                          <span className="font-bold text-red-600">
                            <NumberTicker value={8.5} />%
                          </span>
                        </div>
                        <Progress value={8.5} className="bg-red-100" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Feedback Themes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { theme: "Time Savings", mentions: 89, sentiment: "positive" },
                          { theme: "Ease of Use", mentions: 67, sentiment: "positive" },
                          { theme: "Customer Support", mentions: 34, sentiment: "negative" },
                          { theme: "Feature Requests", mentions: 28, sentiment: "neutral" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getSentimentIcon(item.sentiment)}
                              <span className="font-medium">{item.theme}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">{item.mentions}</span>
                              <Progress value={(item.mentions / 89) * 100} className="w-16" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered Recommendations</CardTitle>
                    <CardDescription>
                      Smart suggestions based on feedback analysis and performance data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        {
                          title: "Content Focus",
                          recommendation: "Emphasize time-saving benefits and productivity gains in all content",
                          confidence: 94
                        },
                        {
                          title: "Feature Development",
                          recommendation: "Prioritize customer support automation and response time improvements",
                          confidence: 87
                        },
                        {
                          title: "Marketing Strategy",
                          recommendation: "Create case studies highlighting specific time savings and ROI metrics",
                          confidence: 91
                        }
                      ].map((rec, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{rec.title}</h4>
                                <Badge variant="outline">{rec.confidence}% confidence</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
                              <Progress value={rec.confidence} />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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
