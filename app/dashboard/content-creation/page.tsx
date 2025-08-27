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
import { Textarea } from "@/components/ui/textarea"
import { 
  Image,
  Video,
  FileText,
  Send,
  Calendar,
  RefreshCw,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Music,
  PenTool,
  Palette,
  Download,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Upload,
  Clock,
  Sparkles,
  Star,
  Settings,
  User,
  Edit,
  Copy,
  ThumbsUp,
  CheckCircle
} from "lucide-react"

// Demo API function for content data
const fetchContentData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  return {
    todayStats: {
      postsGenerated: 47,
      scriptsCreated: 12,
      captionsWritten: 89,
      scheduledPosts: 156
    },
    recentContent: [
      {
        id: 1,
        type: "Instagram Caption",
        platform: "Instagram",
        title: "Monday Motivation: AI-Powered Success",
        content: "🚀 Starting the week strong with AI automation! \n\nHere's how smart businesses are transforming their operations:\n\n✅ 300% faster content creation\n✅ 85% reduction in manual tasks\n✅ 150% increase in lead quality\n\nThe future of business is automated. Are you ready?\n\n#AIAutomation #BusinessGrowth #MondayMotivation #TechInnovation #DigitalTransformation",
        status: "Published",
        engagement: { likes: 247, comments: 18, shares: 34 },
        createdAt: "2 hours ago",
        brandPillars: ["Innovation", "Results", "Motivation"]
      },
      {
        id: 2,
        type: "LinkedIn Post",
        platform: "LinkedIn",
        title: "Industry Insights: The ROI of AI Automation",
        content: "The latest industry report reveals a startling truth: Companies implementing AI automation see an average ROI of 300% within the first year.\n\nKey findings:\n• 67% reduction in operational costs\n• 89% improvement in customer satisfaction\n• 156% increase in team productivity\n\nThe question isn't whether to adopt AI automation—it's how quickly you can implement it.\n\nWhat's your biggest automation challenge? Share in the comments. 👇",
        status: "Scheduled",
        engagement: { likes: 0, comments: 0, shares: 0 },
        createdAt: "1 hour ago",
        brandPillars: ["Expertise", "Data-driven", "Industry Leadership"]
      },
      {
        id: 3,
        type: "Video Script",
        platform: "YouTube",
        title: "5 AI Tools Every Business Owner Needs",
        content: "[Hook - 0-3s]\n'This AI tool just saved me 20 hours this week...'\n\n[Problem - 3-15s]\nBusiness owners are drowning in repetitive tasks. Marketing, customer service, data analysis - it never ends.\n\n[Solution - 15-45s]\nBut what if I told you there are 5 AI tools that can automate 80% of your daily tasks?\n\nTool #1: Lead Qualification AI\n- Automatically scores and routes leads\n- Saves 15 hours per week\n\n[Continue with tools 2-5...]\n\n[CTA - 45-60s]\nReady to transform your business? Link in description for a free automation audit.",
        status: "Draft",
        engagement: { likes: 0, comments: 0, shares: 0 },
        createdAt: "3 hours ago",
        brandPillars: ["Education", "Problem-solving", "Value"]
      }
    ],
    brandPillars: [
      { name: "Innovation", usage: 78, posts: 23 },
      { name: "Results", usage: 65, posts: 19 },
      { name: "Education", usage: 82, posts: 31 },
      { name: "Industry Leadership", usage: 45, posts: 14 },
      { name: "Problem-solving", usage: 71, posts: 22 }
    ]
  }
}

export default function ContentCreationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [contentData, setContentData] = useState<{
    todayStats: any;
    recentContent: any[];
    brandPillars: any[];
  } | null>(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [newContent, setNewContent] = useState("")
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
    
    // Load content data
    fetchContentData().then(data => {
      setContentData(data)
      setDataLoaded(true)
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const generateContent = async (type: string) => {
    setGenerating(true)
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const templates = {
      instagram: "🎯 Game-changing insight alert! \n\nDid you know that businesses using AI automation see:\n\n✨ 200% faster task completion\n✨ 90% fewer manual errors\n✨ 300% better ROI\n\nThe AI revolution isn't coming—it's here. \n\nReady to join the winning team?\n\n#AIRevolution #BusinessAutomation #SuccessStory #TechTrends #Innovation",
      linkedin: "The data is clear: AI automation isn't just a trend—it's a business necessity.\n\nRecent studies show:\n• 84% of executives prioritize AI initiatives\n• Companies see average 25% cost reduction\n• Customer satisfaction improves by 40%\n\nThe businesses thriving tomorrow are investing in automation today.\n\nWhat's your automation strategy? Let's discuss in the comments.",
      twitter: "🚨 AI Automation Reality Check:\n\n❌ 'It's too complex'\n✅ Modern AI is user-friendly\n\n❌ 'It's too expensive'\n✅ ROI averages 300%\n\n❌ 'It'll replace humans'\n✅ It enhances human potential\n\nTime to embrace the future 🤖\n\n#AI #Automation #BusinessGrowth"
    }
    
    setNewContent(templates[type as keyof typeof templates] || "Generated content would appear here...")
    setGenerating(false)
  }

  if (!isAuthenticated) {
    return null
  }

  if (!isAuthenticated || !dataLoaded || !contentData) {
    return (
      <SidebarProvider>
        <AppSidebar onLogout={handleLogout} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading content creation system...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'Instagram': return <Instagram className="h-4 w-4" />
      case 'LinkedIn': return <Linkedin className="h-4 w-4" />
      case 'Twitter': return <Twitter className="h-4 w-4" />
      case 'Facebook': return <Facebook className="h-4 w-4" />
      case 'YouTube': return <Video className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Published': return 'default'
      case 'Scheduled': return 'secondary'
      case 'Draft': return 'outline'
      default: return 'outline'
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
              <h1 className="text-3xl font-bold">Content Creation Bot</h1>
              <p className="text-muted-foreground">
                AI-powered content generation with brand-aligned messaging across all platforms
              </p>
            </div>

            {/* Today's Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="relative overflow-hidden">
                <BorderBeam duration={10} size={90} colorFrom="#ebde10" colorTo="#f5ed6b" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Posts Generated</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={contentData.todayStats.postsGenerated} />
                      </p>
                      <p className="text-xs text-accent">+23% from yesterday</p>
                    </div>
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Scripts Created</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={contentData.todayStats.scriptsCreated} />
                      </p>
                      <p className="text-xs text-accent">+18% from yesterday</p>
                    </div>
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <BorderBeam duration={14} size={100} colorFrom="#ebde10" colorTo="#f5ed6b" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Captions Written</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={contentData.todayStats.captionsWritten} />
                      </p>
                      <p className="text-xs text-accent">+31% from yesterday</p>
                    </div>
                    <Edit className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Scheduled Posts</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={contentData.todayStats.scheduledPosts} />
                      </p>
                      <p className="text-xs text-muted-foreground">+45% from yesterday</p>
                    </div>
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Management Tabs */}
            <Tabs defaultValue="recent" className="space-y-4">
              <TabsList>
                <TabsTrigger value="recent">Recent Content</TabsTrigger>
                <TabsTrigger value="generator">AI Generator</TabsTrigger>
                <TabsTrigger value="brand-pillars">Brand Pillars</TabsTrigger>
                <TabsTrigger value="analytics">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                <div className="grid gap-4">
                  {contentData.recentContent.map((content: {
                    id: string;
                    type: string;
                    title: string;
                    platform: string;
                    content: string;
                    status: string;
                    engagement: { likes: number; comments: number; shares: number };
                    createdAt: string;
                    brandPillars: string[];
                  }) => (
                    <Card key={content.id} className="relative overflow-hidden">
                      {content.status === 'Published' && (
                        <BorderBeam duration={12} size={80} colorFrom="#00ff88" colorTo="#0088ff" />
                      )}
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                {getPlatformIcon(content.platform)}
                                <h3 className="font-semibold">{content.title}</h3>
                                <Badge variant={getStatusColor(content.status)}>
                                  {content.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {content.platform} • {content.createdAt}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                              </Button>
                            </div>
                          </div>

                          {/* Content Preview */}
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="text-sm whitespace-pre-line">{content.content}</p>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              {content.status === 'Published' && (
                                <>
                                  <span className="flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    {content.engagement.likes}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {content.engagement.comments}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <RefreshCw className="h-3 w-3" />
                                    {content.engagement.shares}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {content.brandPillars.map((pillar: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {pillar}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="generator" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Content Generator</CardTitle>
                    <CardDescription>
                      Generate brand-aligned content for any platform with AI assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button 
                        onClick={() => generateContent('instagram')}
                        disabled={generating}
                        className="h-20 flex-col"
                      >
                        <Instagram className="h-6 w-6 mb-2" />
                        Instagram Post
                      </Button>
                      <Button 
                        onClick={() => generateContent('linkedin')}
                        disabled={generating}
                        variant="outline"
                        className="h-20 flex-col"
                      >
                        <Linkedin className="h-6 w-6 mb-2" />
                        LinkedIn Post
                      </Button>
                      <Button 
                        onClick={() => generateContent('twitter')}
                        disabled={generating}
                        variant="outline"
                        className="h-20 flex-col"
                      >
                        <Twitter className="h-6 w-6 mb-2" />
                        Twitter Thread
                      </Button>
                    </div>

                    {generating && (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">AI is crafting your content...</p>
                      </div>
                    )}

                    {newContent && (
                      <div className="space-y-4">
                        <h3 className="font-semibold">Generated Content:</h3>
                        <Textarea 
                          value={newContent}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewContent(e.target.value)}
                          rows={8}
                          className="resize-none"
                        />
                        <div className="flex gap-2">
                          <Button>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve & Schedule
                          </Button>
                          <Button variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Regenerate
                          </Button>
                          <Button variant="outline">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy to Clipboard
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="brand-pillars" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Brand Pillar Performance</CardTitle>
                    <CardDescription>
                      Track how well your content aligns with your brand pillars
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contentData.brandPillars.map((pillar: {
                        name: string;
                        usage: number;
                        posts: number;
                      }, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">{pillar.name}</p>
                            <p className="text-sm text-muted-foreground">{pillar.posts} posts this month</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold">{pillar.usage}%</p>
                              <p className="text-xs text-muted-foreground">Usage rate</p>
                            </div>
                            <Progress value={pillar.usage} className="w-24" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">Voice & Tone</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Professional yet approachable</li>
                          <li>• Data-driven and results-focused</li>
                          <li>• Educational and empowering</li>
                          <li>• Future-forward and innovative</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Content Themes</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• AI automation benefits</li>
                          <li>• Industry insights and trends</li>
                          <li>• Success stories and case studies</li>
                          <li>• Educational how-to content</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { platform: "Instagram", engagement: 4.2, reach: 15600 },
                          { platform: "LinkedIn", engagement: 3.8, reach: 12400 },
                          { platform: "Twitter", engagement: 2.9, reach: 8900 },
                          { platform: "Facebook", engagement: 2.1, reach: 6700 }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(item.platform)}
                              <span className="font-medium">{item.platform}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{item.engagement}%</p>
                              <p className="text-sm text-muted-foreground">{item.reach.toLocaleString()} reach</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Content Type Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { type: "Educational Posts", performance: 87 },
                          { type: "Case Studies", performance: 79 },
                          { type: "Industry Insights", performance: 71 },
                          { type: "Behind-the-Scenes", performance: 65 }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="font-medium">{item.type}</span>
                            <div className="flex items-center gap-3">
                              <span className="font-bold">{item.performance}%</span>
                              <Progress value={item.performance} className="w-20" />
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
