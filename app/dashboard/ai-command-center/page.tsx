"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BorderBeam } from "@/components/ui/border-beam"
import { Meteors } from "@/components/ui/meteors"
import { LoadingAnimation, DashboardEntrance } from "@/components/dashboard/loading-animation"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Send,
  HelpCircle,
  Bot,
  User,
  Sparkles
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Demo chat messages
const demoMessages = [
  {
    id: 1,
    type: "assistant",
    content: "👋 Welcome to SNR AI Command Center! I'm your intelligent system coordinator. I can help you manage all aspects of your automation platform. What would you like to do today?",
    timestamp: "9:30 AM"
  },
  {
    id: 2,
    type: "user",
    content: "Show me the current team status and any urgent tasks",
    timestamp: "9:31 AM"
  },
  {
    id: 3,
    type: "assistant",
    content: "📊 Current Team Status:\n\n• 24 total members across 4 departments\n• 18 active now (75% online)\n• 3 overallocated members need immediate attention\n• David Kim is managing 3 critical projects (120% utilization)\n• Lisa Wang is blocked waiting for API access\n\nUrgent Actions Required:\n1. Rebalance David Kim's workload\n2. Resolve Lisa Wang's API access issue\n3. Assign new task to Emily Rodriguez (currently idle)\n\nWould you like me to automatically rebalance the workload or help resolve the API access issue?",
    timestamp: "9:31 AM"
  },
  {
    id: 4,
    type: "user", 
    content: "Yes, please rebalance David's workload and show me lead qualification results from today",
    timestamp: "9:33 AM"
  },
  {
    id: 5,
    type: "assistant",
    content: "✅ Workload Rebalanced Successfully!\n\nMoved 2 projects from David Kim to:\n• Sarah Johnson (Brand design expertise)\n• Michael Chen (Content strategy alignment)\n\nDavid's utilization: 120% → 85% ✅\n\n📈 Today's Lead Qualification Results:\n\n• 47 new leads processed\n• 12 Premium Quality (25.5% conversion rate)\n• 23 Standard Quality (48.9%)\n• 12 Low Priority (25.5%)\n\nTop Premium Leads:\n1. TechFlow Solutions - $50K budget, immediate need\n2. Digital Dynamics - $35K budget, Q1 2025 start\n3. InnovateCorp - $75K budget, enterprise package\n\nShall I prioritize outreach for these premium leads or analyze conversion patterns?",
    timestamp: "9:33 AM"
  }
]

export default function AICommandCenterPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(true)
  const [showDashboard, setShowDashboard] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState(demoMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router, mounted])

  useEffect(() => {
    if (isAuthenticated) {
      // Simulate loading
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [isAuthenticated])

  const handleLoadingComplete = () => {
    setShowLoadingAnimation(false)
    setTimeout(() => {
      setShowDashboard(true)
    }, 300)
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("user")
    }
    router.push("/login")
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const getCurrentTime = () => {
      const now = new Date()
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const newUserMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      timestamp: getCurrentTime()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "assistant" as const,
        content: "I understand your request. This is a demo response - in the full system, I would coordinate with all SNR AI components to provide real-time insights and execute commands across the entire platform. The AI Command Center will have full access to:\n\n• All system components and their data\n• Real-time performance metrics\n• Automated decision-making capabilities\n• Cross-platform orchestration\n\nWhat specific aspect would you like me to demonstrate?",
        timestamp: getCurrentTime()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!mounted || !isAuthenticated) {
    return null
  }

  if (loading || showLoadingAnimation) {
    return (
      <>
        <LoadingAnimation 
          isVisible={showLoadingAnimation} 
          onComplete={handleLoadingComplete}
          duration={2500}
        />
        {!showLoadingAnimation && (
          <SidebarProvider>
            <AppSidebar onLogout={handleLogout} />
            <SidebarInset>
              <SiteHeader />
              <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Initializing AI Command Center...</p>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        )}
      </>
    )
  }

  return (
    <DashboardEntrance isVisible={showDashboard}>
      <SidebarProvider>
        <AppSidebar onLogout={handleLogout} />
        <SidebarInset>
          <SiteHeader />
          <motion.div 
            className="flex flex-1 flex-col relative bg-slate-950"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          <Meteors number={30} />
          
          {/* Main Chat Interface - Full Screen */}
          <div className="flex-1 p-4 relative z-10">
            <Card className="h-full flex flex-col relative overflow-hidden bg-slate-900 border-slate-800">
              <BorderBeam duration={15} size={120} colorFrom="#00ff88" colorTo="#0088ff" />
              
              {/* Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">AI Command Center</h1>
                      <p className="text-slate-400">Your intelligent system coordinator</p>
                    </div>
                  </div>
                  
                  {/* Help Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          AI Command Center Capabilities
                        </DialogTitle>
                        <DialogDescription>
                          Your AI agent can control and coordinate all aspects of the SNR AI automation platform
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6 py-4">
                        <div className="space-y-4">
                          <h3 className="font-semibold text-blue-600">System Management</h3>
                          <ul className="space-y-2 text-sm">
                            <li>• Real-time workload balancing</li>
                            <li>• Automatic task assignment</li>
                            <li>• Performance monitoring</li>
                            <li>• Capacity planning</li>
                            <li>• Resource optimization</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-semibold text-green-600">Lead & Content Operations</h3>
                          <ul className="space-y-2 text-sm">
                            <li>• AI-powered lead scoring</li>
                            <li>• Automated qualification</li>
                            <li>• Content generation</li>
                            <li>• Brand consistency</li>
                            <li>• Performance optimization</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-semibold text-purple-600">Strategic Intelligence</h3>
                          <ul className="space-y-2 text-sm">
                            <li>• Market trend analysis</li>
                            <li>• Competitor intelligence</li>
                            <li>• Strategy recommendations</li>
                            <li>• Predictive insights</li>
                            <li>• ROI optimization</li>
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-semibold text-orange-600">Cross-Platform Control</h3>
                          <ul className="space-y-2 text-sm">
                            <li>• Event-driven automation</li>
                            <li>• Intelligent routing</li>
                            <li>• Real-time coordination</li>
                            <li>• System orchestration</li>
                            <li>• Natural language commands</li>
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-6 bg-slate-900">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'assistant' && (
                        <Avatar className="h-10 w-10 border-2 border-blue-400">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <Bot className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-[70%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div className={`rounded-2xl p-4 ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white ml-auto' 
                            : 'bg-slate-800 border border-slate-700 text-slate-100'
                        }`}>
                          <div className="text-sm whitespace-pre-line">{message.content}</div>
                        </div>
                        <div className={`text-xs text-slate-500 mt-1 ${
                          message.type === 'user' ? 'text-right' : 'text-left'
                        }`}>
                          {message.timestamp}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                        <Avatar className="h-10 w-10 border-2 border-slate-600">
                          <AvatarFallback className="bg-slate-700 text-slate-300">
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-4 justify-start">
                      <Avatar className="h-10 w-10 border-2 border-blue-400">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="max-w-[70%]">
                        <div className="rounded-2xl p-4 bg-slate-800 border border-slate-700">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input */}
              <div className="p-6 border-t border-slate-800 bg-slate-900">
                <div className="flex gap-3">
                  <Input
                    placeholder="What do you want to know?"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 rounded-full border-2 border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:border-blue-500 px-4"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputMessage.trim() || isTyping}
                    className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </SidebarInset>
    </SidebarProvider>
    </DashboardEntrance>
  )
}
