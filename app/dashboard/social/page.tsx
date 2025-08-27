"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  TrendingUp, 
  Share2, 
  Heart, 
  MessageCircle, 
  Eye, 
  Hash, 
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Zap,
  BarChart3,
  Clock,
  CheckCircle,
  Edit3
} from "lucide-react"

const socialStats = [
  {
    title: "Scheduled Posts",
    value: "24",
    change: "+6",
    icon: Calendar,
    color: "text-blue-400",
  },
  {
    title: "Avg Engagement",
    value: "4.2%",
    change: "+0.8%",
    icon: Heart,
    color: "text-pink-400",
  },
  {
    title: "Reach This Week",
    value: "2.1M",
    change: "+15%",
    icon: Eye,
    color: "text-green-400",
  },
  {
    title: "Content Score",
    value: "8.7/10",
    change: "+0.3",
    icon: TrendingUp,
    color: "text-purple-400",
  },
]

const publishingQueue = [
  {
    id: "1",
    platform: "Instagram",
    content: "Nike Brand Story - Behind the Scenes",
    scheduledTime: "2024-01-15 10:00 AM",
    status: "scheduled",
    client: "Nike",
    type: "Video",
    engagement: "4.5%",
  },
  {
    id: "2",
    platform: "Twitter",
    content: "Apple Product Launch Teaser",
    scheduledTime: "2024-01-15 02:00 PM",
    status: "draft",
    client: "Apple",
    type: "Image",
    engagement: "3.8%",
  },
  {
    id: "3",
    platform: "Facebook",
    content: "Starbucks Holiday Campaign",
    scheduledTime: "2024-01-16 09:00 AM",
    status: "scheduled",
    client: "Starbucks",
    type: "Carousel",
    engagement: "5.2%",
  },
  {
    id: "4",
    platform: "Instagram",
    content: "Behind the Scenes - Nike Shoot",
    scheduledTime: "2024-01-16 06:00 PM",
    status: "pending",
    client: "Nike",
    type: "Story",
    engagement: "6.1%",
  },
]

const platformPerformance = [
  {
    platform: "Instagram",
    followers: "125K",
    engagement: "4.2%",
    reach: "850K",
    posts: 156,
    trend: "up",
    color: "text-pink-500",
  },
  {
    platform: "Twitter",
    followers: "89K",
    engagement: "3.8%",
    reach: "420K",
    posts: 203,
    trend: "up",
    color: "text-blue-500",
  },
  {
    platform: "Facebook",
    followers: "67K",
    engagement: "5.1%",
    reach: "380K",
    posts: 98,
    trend: "stable",
    color: "text-blue-600",
  },
  {
    platform: "YouTube",
    subscribers: "45K",
    engagement: "6.2%",
    views: "2.1M",
    videos: 34,
    trend: "up",
    color: "text-red-500",
  },
]

const hashtagPerformance = [
  {
    hashtag: "#NikeCampaign",
    usage: 24,
    reach: "2.1M",
    engagement: "4.8%",
    trend: "trending",
  },
  {
    hashtag: "#AppleLaunch",
    usage: 18,
    reach: "1.8M",
    engagement: "3.9%",
    trend: "stable",
  },
  {
    hashtag: "#StarbucksHoliday",
    usage: 31,
    reach: "3.2M",
    engagement: "5.4%",
    trend: "trending",
  },
  {
    hashtag: "#BehindTheScenes",
    usage: 42,
    reach: "4.5M",
    engagement: "6.1%",
    trend: "viral",
  },
]

const contentIdeas = [
  {
    id: "1",
    title: "Nike Athlete Interview Series",
    platform: "Instagram",
    type: "Video Series",
    estimatedEngagement: "5.2%",
    difficulty: "medium",
    timeline: "2 weeks",
  },
  {
    id: "2",
    title: "Apple Product Unboxing",
    platform: "YouTube",
    type: "Long-form Video",
    estimatedEngagement: "6.8%",
    difficulty: "high",
    timeline: "3 weeks",
  },
  {
    id: "3",
    title: "Starbucks Seasonal Drinks",
    platform: "Instagram",
    type: "Photo Series",
    estimatedEngagement: "4.9%",
    difficulty: "low",
    timeline: "1 week",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "scheduled":
      return "bg-green-100 text-green-800 border-green-200"
    case "draft":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "pending":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "published":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getTrendColor(trend: string) {
  switch (trend) {
    case "up":
      return "text-green-500"
    case "down":
      return "text-red-500"
    case "stable":
      return "text-yellow-500"
    default:
      return "text-gray-500"
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function SocialDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Social Media Manager Dashboard</h2>
          <p className="text-gray-400 mt-1">Manage publishing calendar, track performance, and optimize content strategy</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
          <Button>
            <Share2 className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-secondary ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Publishing Queue */}
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Publishing Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {publishingQueue.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{post.content}</h4>
                      <p className="text-sm text-gray-600">Client: {post.client}</p>
                      <p className="text-sm text-gray-600">Type: {post.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      <Badge variant="outline">
                        {post.platform}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-600">Scheduled: {post.scheduledTime}</p>
                      <p className="text-gray-600">Engagement: {post.engagement}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Clock className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Platform Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformPerformance.map((platform, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {platform.platform === "Instagram" && <Instagram className="w-4 h-4 text-pink-500" />}
                      {platform.platform === "Twitter" && <Twitter className="w-4 h-4 text-blue-500" />}
                      {platform.platform === "Facebook" && <Facebook className="w-4 h-4 text-blue-600" />}
                      {platform.platform === "YouTube" && <Youtube className="w-4 h-4 text-red-500" />}
                      <h4 className="font-medium">{platform.platform}</h4>
                    </div>
                    <Badge className={getTrendColor(platform.trend)}>
                      {platform.trend === "up" && "↗"}
                      {platform.trend === "down" && "↘"}
                      {platform.trend === "stable" && "→"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">
                        {platform.platform === "YouTube" ? "Subscribers" : "Followers"}: {platform.followers}
                      </p>
                      <p className="text-gray-600">Engagement: {platform.engagement}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        {platform.platform === "YouTube" ? "Views" : "Reach"}: {platform.reach}
                      </p>
                      <p className="text-gray-600">
                        {platform.platform === "YouTube" ? "Videos" : "Posts"}: {platform.posts}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hashtag Performance */}
      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Hashtag Performance & Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hashtagPerformance.map((hashtag, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <h4 className="font-medium mb-2">#{hashtag.hashtag}</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">Usage: {hashtag.usage}</p>
                  <p className="text-gray-600">Reach: {hashtag.reach}</p>
                  <p className="text-gray-600">Engagement: {hashtag.engagement}</p>
                  <Badge className="mt-2">
                    {hashtag.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Ideas */}
      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Content Ideas & Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentIdeas.map((idea) => (
              <div key={idea.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{idea.title}</h4>
                    <p className="text-sm text-gray-600">Platform: {idea.platform}</p>
                    <p className="text-sm text-gray-600">Type: {idea.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(idea.difficulty)}>
                      {idea.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {idea.timeline}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-600">Est. Engagement: {idea.estimatedEngagement}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Develop
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="relative">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Share2 className="w-6 h-6 mb-2" />
              <span className="text-sm">New Post</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              <span className="text-sm">Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Hash className="w-6 h-6 mb-2" />
              <span className="text-sm">Hashtags</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
