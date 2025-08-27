"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Users, Film, Calendar, DollarSign, Palette } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const roleCredentials = {
    creative: { username: "creative", password: "creative", dashboard: "/dashboard/creative", name: "Creative Team", icon: Palette },
    manager: { username: "manager", password: "manager", dashboard: "/dashboard/manager", name: "Project Manager", icon: Users },
    social: { username: "social", password: "social", dashboard: "/dashboard/social", name: "Social Media Manager", icon: Calendar },
    finance: { username: "finance", password: "finance", dashboard: "/dashboard/finance", name: "Finance Team", icon: DollarSign },
  }

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role)
    if (role && roleCredentials[role as keyof typeof roleCredentials]) {
      const credentials = roleCredentials[role as keyof typeof roleCredentials]
      setUsername(credentials.username)
      setPassword(credentials.password)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!selectedRole) {
      setError("Please select a role first")
      setIsLoading(false)
      return
    }

    const credentials = roleCredentials[selectedRole as keyof typeof roleCredentials]
    
    if (username === credentials.username && password === credentials.password) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store auth state in localStorage
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("user", JSON.stringify({
        name: credentials.name,
        email: `${credentials.username}@thegoatmedia.com`,
        role: selectedRole
      }))
      
      router.push(credentials.dashboard)
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setError("Invalid credentials for selected role")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            The GOAT Media
          </h1>
          <p className="text-muted-foreground mt-2">Employee Dashboard</p>
        </div>
        
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Select your role to access your personalized dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select value={selectedRole} onValueChange={handleRoleSelection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creative">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Creative Team
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Project Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="social">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Social Media Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="finance">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Finance Team
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Auto-filled based on role"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Auto-filled based on role"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !selectedRole}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Role-Based Access:</strong><br />
                Select your role to auto-fill credentials<br />
                Each role has a personalized dashboard
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
