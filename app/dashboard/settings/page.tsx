"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Smartphone,
  Key,
  Wifi,
  Download,
  Upload,
  Monitor,
  Volume2,
  Palette,
  Save,
  RefreshCw,
  Bot,
  EyeOff,
  Eye,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

export default function SettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const router = useRouter()

  // Demo settings state
  const [settings, setSettings] = useState({
    profile: {
      name: "Demo User",
      email: "demo@snr-ai.com",
      company: "SNR AI Automation",
      role: "CEO",
      timezone: "America/New_York"
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyReports: true,
      performanceAlerts: true,
      systemUpdates: false
    },
    ai: {
      autoApproval: false,
      learningMode: true,
      dataRetention: "90",
      apiKey: "sk-demo-key-••••••••••••••••",
      model: "gpt-4",
      temperature: 0.7
    },
    integrations: {
      linkedin: true,
      instagram: true,
      twitter: false,
      facebook: true,
      slack: true,
      zapier: false
    }
  })

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
    setDataLoaded(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSaving(false)
    // Show success message (in real app, use toast)
    alert("Settings saved successfully!")
  }

  const updateSetting = (section: string, key: string, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
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
              <p className="mt-4 text-muted-foreground">Loading settings...</p>
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                  Configure your SNR AI Automation system preferences and integrations
                </p>
              </div>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="ai">AI Configuration</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card className="relative overflow-hidden">
                  <BorderBeam duration={20} size={120} colorFrom="#3498db" colorTo="#9b59b6" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={settings.profile.name}
                          onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={settings.profile.company}
                          onChange={(e) => updateSetting('profile', 'company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={settings.profile.role}
                          onChange={(e) => updateSetting('profile', 'role', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input
                        id="timezone"
                        value={settings.profile.timezone}
                        onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to be notified about system events and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Email Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Receive email notifications for important events
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications.emailAlerts}
                        onCheckedChange={(checked) => updateSetting('notifications', 'emailAlerts', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Get instant browser notifications
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Weekly Reports</div>
                        <div className="text-sm text-muted-foreground">
                          Receive comprehensive weekly performance reports
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications.weeklyReports}
                        onCheckedChange={(checked) => updateSetting('notifications', 'weeklyReports', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Performance Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified when performance metrics change significantly
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications.performanceAlerts}
                        onCheckedChange={(checked) => updateSetting('notifications', 'performanceAlerts', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">System Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Notifications about system maintenance and updates
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications.systemUpdates}
                        onCheckedChange={(checked) => updateSetting('notifications', 'systemUpdates', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <Card className="relative overflow-hidden">
                  <BorderBeam duration={15} size={100} colorFrom="#00ff88" colorTo="#0088ff" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      AI Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure AI models and automation behavior
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Auto Approval</div>
                        <div className="text-sm text-muted-foreground">
                          Automatically approve AI-generated content that meets quality thresholds
                        </div>
                      </div>
                      <Switch
                        checked={settings.ai.autoApproval}
                        onCheckedChange={(checked) => updateSetting('ai', 'autoApproval', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Learning Mode</div>
                        <div className="text-sm text-muted-foreground">
                          Allow AI to learn from your feedback and improve over time
                        </div>
                      </div>
                      <Switch
                        checked={settings.ai.learningMode}
                        onCheckedChange={(checked) => updateSetting('ai', 'learningMode', checked)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dataRetention">Data Retention (days)</Label>
                        <Input
                          id="dataRetention"
                          value={settings.ai.dataRetention}
                          onChange={(e) => updateSetting('ai', 'dataRetention', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">AI Model</Label>
                        <Input
                          id="model"
                          value={settings.ai.model}
                          onChange={(e) => updateSetting('ai', 'model', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex gap-2">
                        <Input
                          id="apiKey"
                          type={showApiKey ? "text" : "password"}
                          value={settings.ai.apiKey}
                          onChange={(e) => updateSetting('ai', 'apiKey', e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature (Creativity): {settings.ai.temperature}</Label>
                      <input
                        type="range"
                        id="temperature"
                        min="0"
                        max="1"
                        step="0.1"
                        value={settings.ai.temperature}
                        onChange={(e) => updateSetting('ai', 'temperature', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Conservative</span>
                        <span>Creative</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Platform Integrations
                    </CardTitle>
                    <CardDescription>
                      Connect your social media platforms and external tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Social Media Platforms</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                            <div>
                              <div className="text-base">Instagram</div>
                              <div className="text-sm text-muted-foreground">
                                {settings.integrations.instagram ? "Connected" : "Not connected"}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={settings.integrations.instagram}
                            onCheckedChange={(checked) => updateSetting('integrations', 'instagram', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                            <div>
                              <div className="text-base">LinkedIn</div>
                              <div className="text-sm text-muted-foreground">
                                {settings.integrations.linkedin ? "Connected" : "Not connected"}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={settings.integrations.linkedin}
                            onCheckedChange={(checked) => updateSetting('integrations', 'linkedin', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-400 rounded-lg"></div>
                            <div>
                              <div className="text-base">Twitter</div>
                              <div className="text-sm text-muted-foreground">
                                {settings.integrations.twitter ? "Connected" : "Not connected"}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={settings.integrations.twitter}
                            onCheckedChange={(checked) => updateSetting('integrations', 'twitter', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-800 rounded-lg"></div>
                            <div>
                              <div className="text-base">Facebook</div>
                              <div className="text-sm text-muted-foreground">
                                {settings.integrations.facebook ? "Connected" : "Not connected"}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={settings.integrations.facebook}
                            onCheckedChange={(checked) => updateSetting('integrations', 'facebook', checked)}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">External Tools</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
                            <div>
                              <div className="text-base">Slack</div>
                              <div className="text-sm text-muted-foreground">
                                {settings.integrations.slack ? "Connected" : "Not connected"}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={settings.integrations.slack}
                            onCheckedChange={(checked) => updateSetting('integrations', 'slack', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
                            <div>
                              <div className="text-base">Zapier</div>
                              <div className="text-sm text-muted-foreground">
                                {settings.integrations.zapier ? "Connected" : "Not connected"}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={settings.integrations.zapier}
                            onCheckedChange={(checked) => updateSetting('integrations', 'zapier', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card className="relative overflow-hidden">
                  <BorderBeam duration={18} size={110} colorFrom="#e74c3c" colorTo="#f39c12" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and access controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Authentication</h3>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            <Key className="h-4 w-4 mr-2" />
                            Change Password
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Shield className="h-4 w-4 mr-2" />
                            Enable 2FA
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Database className="h-4 w-4 mr-2" />
                            Download Data
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">Account Status</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Account Verified</span>
                            </div>
                            <Badge variant="outline">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                              <span className="text-sm">2FA Not Enabled</span>
                            </div>
                            <Badge variant="destructive">Action Required</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">API Access</span>
                            </div>
                            <Badge variant="outline">Enabled</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-3">Danger Zone</h3>
                      <div className="space-y-2">
                        <Button variant="destructive" className="w-full">
                          Delete Account
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          This action cannot be undone. All your data will be permanently deleted.
                        </p>
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
