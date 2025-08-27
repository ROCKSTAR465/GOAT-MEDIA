"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Meteors } from "@/components/ui/meteors"
import { motion } from "framer-motion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')
    
    if (authStatus !== 'true' || !userData) {
      router.push('/login')
      return
    }

    try {
      const user = JSON.parse(userData)
      setUserRole(user.role)
      setIsAuthenticated(true)

      // Redirect to role-specific dashboard if on main dashboard
      if (pathname === '/dashboard') {
        const roleRoutes = {
          creative: '/dashboard/creative',
          manager: '/dashboard/manager',
          social: '/dashboard/social',
          finance: '/dashboard/finance'
        }
        
        if (roleRoutes[user.role as keyof typeof roleRoutes]) {
          router.push(roleRoutes[user.role as keyof typeof roleRoutes])
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    }
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "280px",
        "--header-height": "60px",
      } as React.CSSProperties}
    >
      <AppSidebar onLogout={handleLogout} userRole={userRole} />
      <SidebarInset>
        <SiteHeader onLogout={handleLogout} userRole={userRole} />
        <main className="relative flex-1 space-y-4 p-4 md:p-8 pt-6 overflow-y-auto">
            <Meteors number={15} className="opacity-30" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
