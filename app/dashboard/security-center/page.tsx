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
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Eye,
  Activity,
  Users,
  Globe,
  Server,
  Database,
  Wifi,
  UserCheck,
  XCircle
} from "lucide-react"

export default function SecurityCenterPage() {
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
    setTimeout(() => setDataLoaded(true), 1000)
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
              <p className="mt-4 text-muted-foreground">Loading security center...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const securityMetrics = [
    { name: "System Security", value: 98.5, status: "Excellent" },
    { name: "Data Protection", value: 99.2, status: "Excellent" },
    { name: "Access Control", value: 95.7, status: "Good" },
    { name: "Threat Detection", value: 97.3, status: "Excellent" }
  ]

  const recentActivities = [
    {
      type: "login",
      user: "SNR Admin",
      action: "Successful login",
      location: "New York, NY",
      time: "2 minutes ago",
      status: "safe"
    },
    {
      type: "api",
      user: "System",
      action: "API key rotation",
      location: "Automated",
      time: "1 hour ago",
      status: "safe"
    },
    {
      type: "access",
      user: "David Kim",
      action: "Settings access",
      location: "San Francisco, CA",
      time: "3 hours ago",
      status: "safe"
    },
    {
      type: "warning",
      user: "Unknown",
      action: "Failed login attempt",
      location: "Moscow, RU",
      time: "5 hours ago",
      status: "blocked"
    }
  ]

  const accessControls = [
    { role: "Admin", users: 2, permissions: "Full Access", lastReview: "Today" },
    { role: "Manager", users: 5, permissions: "Read/Write", lastReview: "3 days ago" },
    { role: "Agent", users: 15, permissions: "Limited", lastReview: "1 week ago" },
    { role: "Viewer", users: 8, permissions: "Read Only", lastReview: "2 weeks ago" }
  ]

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative overflow-x-hidden">
          <Meteors number={12} />
          
          <DashboardEntrance isVisible={dataLoaded}>
            <div className="space-y-6 relative z-10">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                Security Center
              </h1>
              <p className="text-muted-foreground">
                Comprehensive security monitoring and access control for your SNR AI platform
              </p>
            </div>

            {/* Security Status Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              {securityMetrics.map((metric, idx) => (
                <Card key={idx} className={idx === 0 ? "relative overflow-hidden" : ""}>
                  {idx === 0 && <BorderBeam duration={8} size={70} colorFrom="#e74c3c" colorTo="#f39c12" />}
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.name}</p>
                        <p className="text-2xl font-bold">
                          <NumberTicker value={metric.value} />%
                        </p>
                        <Badge variant={metric.status === "Excellent" ? "default" : "secondary"}>
                          {metric.status}
                        </Badge>
                      </div>
                      <Shield className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Security Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Security Overview</TabsTrigger>
                <TabsTrigger value="access">Access Control</TabsTrigger>
                <TabsTrigger value="monitoring">Activity Monitoring</TabsTrigger>
                <TabsTrigger value="compliance">Compliance & Audits</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Security Health
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">SSL/TLS Encryption</span>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Two-Factor Authentication</span>
                          </div>
                          <Badge variant="outline">Enabled</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">API Security</span>
                          </div>
                          <Badge variant="outline">Protected</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">Vulnerability Scan</span>
                          </div>
                          <Badge variant="destructive">Pending</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        System Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Server className="h-4 w-4" />
                            <span className="text-sm">Server Infrastructure</span>
                          </div>
                          <Badge variant="outline" className="text-green-600">Secure</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            <span className="text-sm">Database Security</span>
                          </div>
                          <Badge variant="outline" className="text-green-600">Protected</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            <span className="text-sm">Network Security</span>
                          </div>
                          <Badge variant="outline" className="text-green-600">Monitored</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span className="text-sm">External APIs</span>
                          </div>
                          <Badge variant="outline" className="text-blue-600">Encrypted</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <div className="flex-1">
                          <p className="font-medium">Schedule Security Audit</p>
                          <p className="text-sm text-muted-foreground">Last comprehensive audit was 90 days ago</p>
                        </div>
                        <Button size="sm">Schedule</Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Key className="h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                          <p className="font-medium">Rotate API Keys</p>
                          <p className="text-sm text-muted-foreground">Some API keys haven&apos;t been rotated in 60 days</p>
                        </div>
                        <Button size="sm" variant="outline">Rotate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="access" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Role-Based Access Control
                    </CardTitle>
                    <CardDescription>
                      Manage user roles and permissions across the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {accessControls.map((role, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <UserCheck className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{role.role}</h3>
                              <p className="text-sm text-muted-foreground">
                                {role.users} users • {role.permissions}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">Last review: {role.lastReview}</p>
                            <Button size="sm" variant="outline">Manage</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Recent Security Activities
                    </CardTitle>
                    <CardDescription>
                      Monitor all security-related events and access attempts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivities.map((activity, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              activity.status === 'safe' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {activity.status === 'safe' ? 
                                <CheckCircle className="h-4 w-4 text-green-600" /> : 
                                <XCircle className="h-4 w-4 text-red-600" />
                              }
                            </div>
                            <div>
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.user} • {activity.location}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={activity.status === 'safe' ? 'outline' : 'destructive'}>
                              {activity.status === 'safe' ? 'Safe' : 'Blocked'}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">GDPR Compliance</span>
                          <Badge variant="outline" className="text-green-600">Compliant</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">SOC 2 Type II</span>
                          <Badge variant="outline" className="text-green-600">Certified</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">ISO 27001</span>
                          <Badge variant="outline" className="text-orange-600">Pending</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">CCPA Compliance</span>
                          <Badge variant="outline" className="text-green-600">Compliant</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Audit History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-lg font-bold">
                          <NumberTicker value={12} />
                        </p>
                        <p className="text-sm text-muted-foreground">Security Audits Completed</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-lg font-bold">
                          <NumberTicker value={0} />
                        </p>
                        <p className="text-sm text-muted-foreground">Critical Vulnerabilities</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-lg font-bold">
                          <NumberTicker value={98.7} />%
                        </p>
                        <p className="text-sm text-muted-foreground">Compliance Score</p>
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
