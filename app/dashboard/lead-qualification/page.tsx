"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NumberTicker } from "@/components/ui/number-ticker"
import { BorderBeam } from "@/components/ui/border-beam"
import { Meteors } from "@/components/ui/meteors"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { ActionButtons } from "@/components/dashboard/action-buttons"
import { DashboardEntrance } from "@/components/dashboard/loading-animation"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  Star,
  Mail,
  Phone,
  Globe,
  Building,
  DollarSign
} from "lucide-react"

// Demo API function for lead data
const fetchLeadData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    todayStats: {
      newLeads: 23,
      qualified: 8,
      hot: 3,
      converted: 2
    },
    recentLeads: [
      {
        id: 1,
        name: "Sarah Johnson",
        company: "TechCorp Solutions",
        email: "sarah@techcorp.com",
        phone: "+1 (555) 123-4567",
        score: 95,
        category: "Hot",
        source: "LinkedIn",
        industry: "Technology",
        companySize: "100-500",
        budget: "$150K-$250K",
        timeline: "Immediate",
        painPoints: ["Lead generation", "Sales automation", "Content marketing"],
        interests: ["AI automation", "Marketing efficiency", "ROI optimization"],
        lastActivity: "2 hours ago",
        nextAction: "Schedule demo call"
      },
      {
        id: 2,
        name: "Michael Chen",
        company: "Digital Dynamics Inc",
        email: "mike@digitaldynamics.com",
        phone: "+1 (555) 234-5678",
        score: 87,
        category: "Hot",
        source: "Website Form",
        industry: "Digital Marketing",
        companySize: "50-100",
        budget: "$75K-$150K",
        timeline: "1-2 months",
        painPoints: ["Team productivity", "Client management", "Scaling operations"],
        interests: ["Automation tools", "Team coordination", "Process optimization"],
        lastActivity: "4 hours ago",
        nextAction: "Send proposal"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        company: "Growth Labs",
        email: "emily@growthlabs.io",
        phone: "+1 (555) 345-6789",
        score: 76,
        category: "Warm",
        source: "Referral",
        industry: "Consulting",
        companySize: "20-50",
        budget: "$50K-$100K",
        timeline: "2-3 months",
        painPoints: ["Content creation", "Social media management", "Lead nurturing"],
        interests: ["Content automation", "Social media tools", "Lead scoring"],
        lastActivity: "1 day ago",
        nextAction: "Follow-up email"
      },
      {
        id: 4,
        name: "David Kim",
        company: "Innovation Works",
        email: "david@innovationworks.com",
        phone: "+1 (555) 456-7890",
        score: 45,
        category: "Cold",
        source: "Cold Outreach",
        industry: "Manufacturing",
        companySize: "500+",
        budget: "Under $50K",
        timeline: "6+ months",
        painPoints: ["Digital transformation", "Process automation", "Data analytics"],
        interests: ["Industry 4.0", "Automation", "Digital tools"],
        lastActivity: "3 days ago",
        nextAction: "Educational content"
      }
    ]
  }
}

export default function LeadQualificationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [leadData, setLeadData] = useState<{
    todayStats: any;
    recentLeads: any[];
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
    
    // Load lead data
    fetchLeadData().then(data => {
      setLeadData(data)
      setDataLoaded(true)
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!isAuthenticated || !dataLoaded || !leadData) {
    return (
      <SidebarProvider>
        <AppSidebar onLogout={handleLogout} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading lead qualification data...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Hot': return 'destructive'
      case 'Warm': return 'default'
      case 'Cold': return 'secondary'
      default: return 'secondary'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Hot': return <Target className="h-4 w-4" />
      case 'Warm': return <TrendingUp className="h-4 w-4" />
      case 'Cold': return <Clock className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative overflow-x-hidden">
          <Meteors number={30} />
          
          <DashboardEntrance isVisible={dataLoaded}>
            <div className="space-y-6 relative z-10">
            <div>
              <h1 className="text-3xl font-bold">Lead Qualification Bot</h1>
              <p className="text-muted-foreground">
                AI-powered lead scoring and qualification system with intelligent routing
              </p>
            </div>

            {/* Today's Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="relative overflow-hidden">
                <BorderBeam duration={12} size={100} colorFrom="#00ff88" colorTo="#0088ff" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">New Leads</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={leadData.todayStats.newLeads} />
                      </p>
                      <p className="text-xs text-accent">+15% from yesterday</p>
                    </div>
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Qualified</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={leadData.todayStats.qualified} />
                      </p>
                      <p className="text-xs text-accent">+28% from yesterday</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <BorderBeam duration={15} size={80} colorFrom="#ebde10" colorTo="#f5ed6b" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Hot Leads</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={leadData.todayStats.hot} />
                      </p>
                      <p className="text-xs text-accent">+50% from yesterday</p>
                    </div>
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Converted</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={leadData.todayStats.converted} />
                      </p>
                      <p className="text-xs text-accent">+100% from yesterday</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lead Management Tabs */}
            <Tabs defaultValue="recent" className="space-y-4">
              <TabsList>
                <TabsTrigger value="recent">Recent Leads</TabsTrigger>
                <TabsTrigger value="scoring">Scoring System</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                <div className="grid gap-4">
                  {leadData.recentLeads.map((lead: {
                    id: string;
                    name: string;
                    company: string;
                    email: string;
                    phone: string;
                    source: string;
                    score: number;
                    status: string;
                    lastContact: string;
                    notes: string;
                    category: string;
                    industry: string;
                    companySize: string;
                    budget: string;
                    timeline: string;
                    painPoints: string[];
                    nextAction: string;
                    lastActivity: string;
                    interests: string[];
                  }) => (
                    <Card key={lead.id} className="relative overflow-hidden">
                      {lead.category === 'Hot' && (
                        <BorderBeam duration={8} size={60} colorFrom="#ff4757" colorTo="#ff6348" />
                      )}
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Lead Info */}
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback>{lead.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{lead.name}</h3>
                                  <Badge variant={getCategoryColor(lead.category)}>
                                    {getCategoryIcon(lead.category)}
                                    {lead.category}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{lead.company}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {lead.email}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {lead.phone}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Lead Score</span>
                                <span className="text-sm font-medium">{lead.score}/100</span>
                              </div>
                              <Progress value={lead.score} />
                            </div>
                          </div>

                          {/* Company Details */}
                          <div className="space-y-3">
                            <h4 className="font-medium">Company Profile</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.industry}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.companySize} employees</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.budget} budget</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.timeline}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span>Source: {lead.source}</span>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-1">Pain Points:</p>
                              <div className="flex flex-wrap gap-1">
                                {lead.painPoints.map((point: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {point}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium mb-2">Next Action</p>
                              <Badge variant="outline" className="mb-3">
                                {lead.nextAction}
                              </Badge>
                              <p className="text-xs text-muted-foreground">
                                Last activity: {lead.lastActivity}
                              </p>
                            </div>

                            <ActionButtons
                              variant="detailed"
                              leadName={lead.name}
                              leadCompany={lead.company}
                              leadInfo={`${lead.industry} company (${lead.companySize} employees) with ${lead.budget} budget, looking for ${lead.painPoints.join(', ')} solutions. Timeline: ${lead.timeline}.`}
                              priority={lead.category === 'Hot' ? 'high' : lead.category === 'Warm' ? 'medium' : 'low'}
                              leadValue={lead.budget}
                              showViewDetails={true}
                              showConfigure={true}
                            />

                            <div>
                              <p className="text-sm font-medium mb-1">Interests:</p>
                              <div className="space-y-1">
                                {lead.interests.map((interest: string, idx: number) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs">
                                    <Star className="h-3 w-3 text-accent" />
                                    <span>{interest}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="scoring" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Scoring System</CardTitle>
                    <CardDescription>
                      Multi-factor lead scoring algorithm with real-time qualification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Hot Leads</CardTitle>
                          <CardDescription>Score: 76-100</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li>• High budget match</li>
                            <li>• Immediate timeline</li>
                            <li>• Decision maker identified</li>
                            <li>• Strong pain point alignment</li>
                            <li>• Multiple touchpoints</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Warm Leads</CardTitle>
                          <CardDescription>Score: 41-75</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li>• Moderate budget fit</li>
                            <li>• 1-3 month timeline</li>
                            <li>• Some qualification criteria</li>
                            <li>• Engaged with content</li>
                            <li>• Nurturing required</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Cold Leads</CardTitle>
                          <CardDescription>Score: 0-40</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li>• Budget unclear</li>
                            <li>• Long timeline (6+ months)</li>
                            <li>• Limited engagement</li>
                            <li>• Educational content needed</li>
                            <li>• Automated sequences</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Scoring Factors</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { factor: "Budget Alignment", weight: 25, description: "Match between budget and solution cost" },
                          { factor: "Timeline Urgency", weight: 20, description: "How quickly they need a solution" },
                          { factor: "Decision Authority", weight: 20, description: "Level of purchasing power" },
                          { factor: "Pain Point Match", weight: 15, description: "Alignment with our solutions" },
                          { factor: "Company Fit", weight: 10, description: "Size and industry match" },
                          { factor: "Engagement Level", weight: 10, description: "Interaction with content and communications" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{item.factor}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{item.weight}%</p>
                              <Progress value={item.weight * 4} className="w-20" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Qualification Rate</span>
                          <span className="font-bold">
                            <NumberTicker value={34.7} />%
                          </span>
                        </div>
                        <Progress value={34.7} />
                        
                        <div className="flex items-center justify-between">
                          <span>Hot Lead Conversion</span>
                          <span className="font-bold">
                            <NumberTicker value={67} />%
                          </span>
                        </div>
                        <Progress value={67} />
                        
                        <div className="flex items-center justify-between">
                          <span>Response Time</span>
                          <span className="font-bold">
                            <NumberTicker value={2.3} /> min
                          </span>
                        </div>
                        <Progress value={85} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Source Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { source: "LinkedIn", leads: 45, conversion: 28 },
                          { source: "Website Forms", leads: 38, conversion: 22 },
                          { source: "Referrals", leads: 23, conversion: 45 },
                          { source: "Cold Outreach", leads: 15, conversion: 12 }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{item.source}</p>
                              <p className="text-sm text-muted-foreground">{item.leads} leads</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{item.conversion}%</p>
                              <Progress value={item.conversion} className="w-20" />
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
