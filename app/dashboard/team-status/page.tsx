"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { NumberTicker } from "@/components/ui/number-ticker"
import { BorderBeam } from "@/components/ui/border-beam"
import { Meteors } from "@/components/ui/meteors"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { DemoButtons } from "@/components/dashboard/demo-buttons"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Users,
  TrendingUp,
  BarChart3,
  Bot,
  Clock,
  Star,
  Activity,
  User,
  CheckCircle,
  AlertTriangle,
  Award,
  Target,
  Zap,
  TrendingDown,
  UserCheck,
  MessageSquare,
  Coffee,
  UserX,
  Briefcase
} from "lucide-react"

// Type definitions
interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  department: string;
  status: string;
  utilization: number;
  currentTask: string;
  avatar?: string;
  lastActive: string;
  efficiency?: number;
  tasksCompleted?: number;
  currentProject?: string;
  skills: string[];
  tasksToday: number;
  completedToday: number;
  estimatedCompletion: string;
  clients: string[];
  productivity: number;
}

interface Department {
  name: string;
  activeMembers?: number;
  totalMembers?: number;
  members: number;
  utilization: number;
  efficiency: number;
  status?: string;
}

// Demo API function for team data
const fetchTeamData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1100))
  
  return {
    todayStats: {
      totalMembers: 24,
      activeNow: 18,
      tasksCompleted: 67,
      avgUtilization: 78
    },
    teamMembers: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Lead Designer",
        department: "Creative",
        status: "Active",
        currentTask: "Brand design for TechCorp",
        utilization: 85,
        tasksToday: 4,
        completedToday: 3,
        estimatedCompletion: "2:30 PM",
        skills: ["Branding", "UI/UX", "Illustration"],
        clients: ["TechCorp", "DigitalFlow"],
        lastActive: "2 min ago",
        productivity: 92
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Content Strategist",
        department: "Marketing",
        status: "In Meeting",
        currentTask: "Client strategy session",
        utilization: 78,
        tasksToday: 6,
        completedToday: 4,
        estimatedCompletion: "4:15 PM",
        skills: ["Content Strategy", "SEO", "Analytics"],
        clients: ["GrowthLabs", "InnovateCo"],
        lastActive: "15 min ago",
        productivity: 88
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        role: "Social Media Manager",
        department: "Marketing",
        status: "Idle",
        currentTask: "Available for assignment",
        utilization: 45,
        tasksToday: 3,
        completedToday: 3,
        estimatedCompletion: "Available",
        skills: ["Social Media", "Content Creation", "Analytics"],
        clients: ["Available"],
        lastActive: "5 min ago",
        productivity: 95
      },
      {
        id: 4,
        name: "David Kim",
        role: "Project Manager",
        department: "Operations",
        status: "Overallocated",
        currentTask: "Managing 3 critical projects",
        utilization: 120,
        tasksToday: 8,
        completedToday: 5,
        estimatedCompletion: "6:30 PM",
        skills: ["Project Management", "Team Leadership", "Strategy"],
        clients: ["TechCorp", "DigitalFlow", "StartupX"],
        lastActive: "1 min ago",
        productivity: 87
      },
      {
        id: 5,
        name: "Lisa Wang",
        role: "AI Specialist",
        department: "Technology",
        status: "Blocked",
        currentTask: "Waiting for API access",
        utilization: 25,
        tasksToday: 2,
        completedToday: 1,
        estimatedCompletion: "Blocked",
        skills: ["AI Development", "Machine Learning", "Data Analysis"],
        clients: ["InnovateCo"],
        lastActive: "30 min ago",
        productivity: 90
      }
    ],
    departments: [
      { name: "Creative", members: 8, utilization: 82, efficiency: 89 },
      { name: "Marketing", members: 6, utilization: 75, efficiency: 85 },
      { name: "Operations", members: 4, utilization: 90, efficiency: 78 },
      { name: "Technology", members: 6, utilization: 88, efficiency: 92 }
    ]
  }
}

export default function TeamStatusPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [teamData, setTeamData] = useState<{
    todayStats: any;
    teamMembers: TeamMember[];
    departments: Department[];
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
    
    // Load team data
    fetchTeamData().then(data => {
      setTeamData(data)
      setDataLoaded(true)
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!isAuthenticated || !dataLoaded || !teamData) {
    return (
      <SidebarProvider>
        <AppSidebar onLogout={handleLogout} />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading team status data...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'default'
      case 'In Meeting': return 'secondary'
      case 'Idle': return 'outline'
      case 'Overallocated': return 'destructive'
      case 'Blocked': return 'destructive'
      default: return 'secondary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Active': return <UserCheck className="h-4 w-4" />
      case 'In Meeting': return <MessageSquare className="h-4 w-4" />
      case 'Idle': return <Coffee className="h-4 w-4" />
      case 'Overallocated': return <AlertTriangle className="h-4 w-4" />
      case 'Blocked': return <UserX className="h-4 w-4" />
      default: return <UserCheck className="h-4 w-4" />
    }
  }

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
              <h1 className="text-3xl font-bold">Team Status Tracker</h1>
              <p className="text-muted-foreground">
                Real-time workforce capacity management and intelligent task allocation
              </p>
            </div>

            {/* Today's Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="relative overflow-hidden">
                <BorderBeam duration={11} size={85} colorFrom="#3498db" colorTo="#9b59b6" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Members</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={teamData.todayStats.totalMembers} />
                      </p>
                      <p className="text-xs text-accent">Across 4 departments</p>
                    </div>
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Now</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={teamData.todayStats.activeNow} />
                      </p>
                      <p className="text-xs text-accent">
                        {Math.round((teamData.todayStats.activeNow / teamData.todayStats.totalMembers) * 100)}% online
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <BorderBeam duration={13} size={95} colorFrom="#ebde10" colorTo="#f5ed6b" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                      <p className="text-2xl font-bold text-accent">
                        <NumberTicker value={teamData.todayStats.tasksCompleted} />
                      </p>
                      <p className="text-xs text-accent">+12% from yesterday</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Utilization</p>
                      <p className="text-2xl font-bold">
                        <NumberTicker value={teamData.todayStats.avgUtilization} />%
                      </p>
                      <p className="text-xs text-muted-foreground">Optimal range</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Management Tabs */}
            <Tabs defaultValue="members" className="space-y-4">
              <TabsList>
                <TabsTrigger value="members">Team Members</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="space-y-4">
                <div className="grid gap-4">
                  {teamData.teamMembers.map((member: TeamMember) => (
                    <Card key={member.id} className="relative overflow-hidden">
                      {member.status === 'Overallocated' && (
                        <BorderBeam duration={6} size={60} colorFrom="#ff4757" colorTo="#ff6348" />
                      )}
                      {member.status === 'Idle' && (
                        <BorderBeam duration={10} size={70} colorFrom="#00ff88" colorTo="#0088ff" />
                      )}
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-4 gap-6">
                          {/* Member Info */}
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{member.name}</h3>
                                  <Badge variant={getStatusColor(member.status)}>
                                    {getStatusIcon(member.status)}
                                    {member.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                                <p className="text-xs text-muted-foreground">{member.department}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Utilization</span>
                                <span className="text-sm font-medium">{member.utilization}%</span>
                              </div>
                              <Progress value={Math.min(member.utilization, 100)} />
                            </div>
                          </div>

                          {/* Current Work */}
                          <div className="space-y-3">
                            <h4 className="font-medium">Current Work</h4>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">{member.currentTask}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  {member.tasksToday} tasks today
                                </span>
                                <span className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  {member.completedToday} completed
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <Clock className="h-3 w-3" />
                                <span>ETC: {member.estimatedCompletion}</span>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-1">Current Clients:</p>
                              <div className="flex flex-wrap gap-1">
                                {member.clients.map((client: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {client}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Skills & Performance */}
                          <div className="space-y-3">
                            <h4 className="font-medium">Skills & Performance</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Productivity</span>
                                <span className="text-sm font-medium">{member.productivity}%</span>
                              </div>
                              <Progress value={member.productivity} />
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-1">Core Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {member.skills.map((skill: string, idx: number) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <p className="text-xs text-muted-foreground">
                              Last active: {member.lastActive}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="space-y-3">
                            <h4 className="font-medium">Actions</h4>
                            <DemoButtons
                              variant="compact"
                              memberName={member.name}
                              showViewDetails={true}
                              showConfigure={true}
                              className="flex-col space-y-2"
                            />
                            
                            {member.status === 'Idle' && (
                              <Button className="w-full" size="sm">
                                <Briefcase className="h-4 w-4 mr-2" />
                                Assign Task
                              </Button>
                            )}
                            {member.status === 'Overallocated' && (
                              <Button variant="destructive" className="w-full" size="sm">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Rebalance Load
                              </Button>
                            )}
                            {member.status === 'Blocked' && (
                              <Button variant="outline" className="w-full" size="sm">
                                <UserCheck className="h-4 w-4 mr-2" />
                                Resolve Block
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="departments" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {teamData.departments.map((dept: Department, idx: number) => (
                    <Card key={idx} className="relative overflow-hidden">
                      {idx === 0 && <BorderBeam duration={15} size={100} colorFrom="#9b59b6" colorTo="#3498db" />}
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {dept.name}
                          <Badge variant="outline">{dept.members} members</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Utilization</span>
                            <span className="text-sm font-medium">{dept.utilization}%</span>
                          </div>
                          <Progress value={dept.utilization} />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Efficiency</span>
                            <span className="text-sm font-medium">{dept.efficiency}%</span>
                          </div>
                          <Progress value={dept.efficiency} />
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div className="text-center">
                            <p className="text-lg font-bold">
                              <NumberTicker value={Math.floor(Math.random() * 20) + 15} />
                            </p>
                            <p className="text-xs text-muted-foreground">Active Tasks</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold">
                              <NumberTicker value={Math.floor(Math.random() * 10) + 25} />
                            </p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold">
                              <NumberTicker value={Math.floor(Math.random() * 5) + 2} />
                            </p>
                            <p className="text-xs text-muted-foreground">Blocked</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="capacity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Capacity Planning</CardTitle>
                    <CardDescription>
                      Optimize resource allocation and identify opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-accent">Available Capacity</h3>
                        <div className="space-y-3">
                          {teamData.teamMembers
                            .filter((m: TeamMember) => m.status === 'Idle' || m.utilization < 70)
                            .map((member: TeamMember, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                              </div>
                              <Badge variant="outline">{member.utilization}%</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">At Capacity</h3>
                        <div className="space-y-3">
                          {teamData.teamMembers
                            .filter((m: TeamMember) => m.utilization >= 70 && m.utilization <= 100)
                            .map((member: TeamMember, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                              </div>
                              <Badge variant="secondary">{member.utilization}%</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-destructive">Overallocated</h3>
                        <div className="space-y-3">
                          {teamData.teamMembers
                            .filter((m: TeamMember) => m.utilization > 100)
                            .map((member: TeamMember, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                              </div>
                              <Badge variant="destructive">{member.utilization}%</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Performance Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Weekly Productivity</span>
                          <span className="font-bold">
                            <NumberTicker value={89.2} />%
                          </span>
                        </div>
                        <Progress value={89.2} />
                        
                        <div className="flex items-center justify-between">
                          <span>Task Completion Rate</span>
                          <span className="font-bold">
                            <NumberTicker value={94.7} />%
                          </span>
                        </div>
                        <Progress value={94.7} />
                        
                        <div className="flex items-center justify-between">
                          <span>Resource Utilization</span>
                          <span className="font-bold">
                            <NumberTicker value={78.3} />%
                          </span>
                        </div>
                        <Progress value={78.3} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Department Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {teamData.departments.map((dept: Department, idx: number) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{dept.name}</p>
                              <p className="text-sm text-muted-foreground">{dept.members} members</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{dept.efficiency}%</p>
                              <Progress value={dept.efficiency} className="w-20" />
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
