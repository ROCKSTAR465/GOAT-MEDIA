"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Users,
  UserCheck,
  Film,
  Calendar,
  DollarSign,
  Mountain,
  Settings,
  Palette,
  Target,
  Share2,
  Receipt,
  FileText,
  Camera,
  Edit3,
  Hash,
  PieChart,
  Calculator,
  Clock,
  Bell,
  MessageSquare
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const getRoleData = (role: string) => {
  const baseData = {
    user: {
      name: "User",
      email: "user@thegoatmedia.com",
      avatar: "/avatars/user.jpg",
    },
    navSecondary: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  }

  switch (role) {
    case "creative":
      return {
        ...baseData,
        user: {
          ...baseData.user,
          name: "Creative Team Member",
          email: "creative@thegoatmedia.com",
        },
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard/creative",
            icon: BarChart3,
          },
          {
            title: "My Scripts",
            url: "/dashboard/creative/scripts",
            icon: FileText,
          },
          {
            title: "Shoot Schedule",
            url: "/dashboard/creative/schedule",
            icon: Camera,
          },
          {
            title: "Editing Queue",
            url: "/dashboard/creative/editing",
            icon: Edit3,
          },
          {
            title: "Time Tracking",
            url: "/dashboard/creative/time",
            icon: Clock,
          },
          {
            title: "Client Feedback",
            url: "/dashboard/creative/feedback",
            icon: MessageSquare,
          },
        ],
      }
    case "manager":
      return {
        ...baseData,
        user: {
          ...baseData.user,
          name: "Project Manager",
          email: "manager@thegoatmedia.com",
        },
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard/manager",
            icon: BarChart3,
          },
          {
            title: "Project Overview",
            url: "/dashboard/manager/projects",
            icon: Target,
          },
          {
            title: "Team Management",
            url: "/dashboard/manager/team",
            icon: Users,
          },
          {
            title: "Resource Allocation",
            url: "/dashboard/manager/resources",
            icon: UserCheck,
          },
          {
            title: "Client Projects",
            url: "/dashboard/manager/clients",
            icon: TrendingUp,
          },
          {
            title: "Timeline Management",
            url: "/dashboard/manager/timeline",
            icon: Calendar,
          },
        ],
      }
    case "social":
      return {
        ...baseData,
        user: {
          ...baseData.user,
          name: "Social Media Manager",
          email: "social@thegoatmedia.com",
        },
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard/social",
            icon: BarChart3,
          },
          {
            title: "Publishing Calendar",
            url: "/dashboard/social/calendar",
            icon: Calendar,
          },
          {
            title: "Content Creation",
            url: "/dashboard/social/content",
            icon: Film,
          },
          {
            title: "Analytics",
            url: "/dashboard/social/analytics",
            icon: TrendingUp,
          },
          {
            title: "Hashtag Management",
            url: "/dashboard/social/hashtags",
            icon: Hash,
          },
          {
            title: "Platform Performance",
            url: "/dashboard/social/platforms",
            icon: Share2,
          },
        ],
      }
    case "finance":
      return {
        ...baseData,
        user: {
          ...baseData.user,
          name: "Finance Team Member",
          email: "finance@thegoatmedia.com",
        },
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard/finance",
            icon: BarChart3,
          },
          {
            title: "Budget Management",
            url: "/dashboard/finance/budgets",
            icon: Target,
          },
          {
            title: "Invoice Management",
            url: "/dashboard/finance/invoices",
            icon: Receipt,
          },
          {
            title: "Financial Reports",
            url: "/dashboard/finance/reports",
            icon: PieChart,
          },
          {
            title: "Cost Analysis",
            url: "/dashboard/finance/costs",
            icon: Calculator,
          },
          {
            title: "Client Accounts",
            url: "/dashboard/finance/clients",
            icon: Users,
          },
        ],
      }
    default:
      return {
        ...baseData,
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: BarChart3,
          },
        ],
      }
  }
}

export function AppSidebar({ onLogout, userRole, ...props }: React.ComponentProps<typeof Sidebar> & { 
  onLogout?: () => void
  userRole?: string 
}) {
  const data = getRoleData(userRole || "")

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Mountain className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">The GOAT Media</span>
                  <span className="truncate text-xs">
                    {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard` : "Employee Dashboard"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
    </motion.div>
  )
}
