"use client"

import * as React from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts"
import { Bell, FileText, Video, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { EmployeeDashboardData, Notification, Script, Shoot } from "@/lib/types"

export default function EmployeeDashboardPage() {
  const [data, setData] = React.useState<EmployeeDashboardData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/employee/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDismissNotification = async (notificationId: string) => {
    if (!data) return;
    // Optimistically update the UI
    const originalNotifications = data.notifications;
    setData({
        ...data,
        notifications: data.notifications.filter((n: Notification) => n.id !== notificationId)
    });

    try {
        await fetch('/api/notifications/dismiss', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notification_id: notificationId }),
        });
    } catch (error) {
        console.error("Failed to dismiss notification:", error);
        // Revert if the API call fails
        setData({ ...data, notifications: originalNotifications });
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  const { user, quickStats, taskCompletionData, workloadData, notifications, scriptsInReview, shootsToday } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">Here&apos;s your dashboard for today.</p>
        </div>
        <p className="text-sm text-muted-foreground italic">&quot;Creativity fuels growth.&quot;</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Joined on {new Date(user.joined_date).toLocaleDateString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Stats</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center"><span className="text-muted-foreground">Tasks due today</span><span className="font-bold text-lg">{quickStats.tasksDue}</span></div>
              <div className="flex justify-between items-center"><span className="text-muted-foreground">Approvals pending</span><span className="font-bold text-lg">{quickStats.pendingApprovals}</span></div>
              <div className="flex justify-between items-center"><span className="text-muted-foreground">Shoots this week</span><span className="font-bold text-lg">{quickStats.shootsThisWeek}</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Task Completion Rate</CardTitle><CardDescription>Your weekly task completion progress.</CardDescription></CardHeader>
            <CardContent>
              <ChartContainer className="h-48 w-full" config={{}}><BarChart data={taskCompletionData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="week" /><YAxis /><ChartTooltip content={<ChartTooltipContent />} /><Bar dataKey="completed" fill="var(--color-primary)" radius={4} /></BarChart></ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Upcoming Workload</CardTitle><CardDescription>Your deadlines over the next 7 days.</CardDescription></CardHeader>
            <CardContent>
              <ChartContainer className="h-48 w-full" config={{}}><LineChart data={workloadData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="day" /><YAxis /><ChartTooltip content={<ChartTooltipContent />} /><Line type="monotone" dataKey="deadlines" stroke="var(--color-primary)" strokeWidth={2} /></LineChart></ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row - Preview Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {notifications.map((n: Notification) => (
                <li key={n.id} className="text-sm flex justify-between items-center group">
                  <span>{n.message}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => handleDismissNotification(n.id)}><X className="h-4 w-4" /></Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Scripts in Review</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {scriptsInReview.map((s: Script) => (<li key={s.id} className="text-sm flex justify-between"><span>{s.title}</span><Badge variant="outline">{s.version}</Badge></li>))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Video className="w-5 h-5" /> Shoots Today</CardTitle></CardHeader>
          <CardContent>
            {shootsToday.length > 0 ? (<ul className="space-y-3">{shootsToday.map((s: Shoot) => (<li key={s.id} className="text-sm flex justify-between"><span>{s.title}</span><span className="font-semibold">{new Date(s.shoot_date).toLocaleTimeString()}</span></li>))}</ul>) : (<p className="text-sm text-muted-foreground">No shoots scheduled for today.</p>)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80 mt-2" />
        </div>
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card><CardHeader className="flex flex-row items-center gap-4"><Skeleton className="h-16 w-16 rounded-full" /><div><Skeleton className="h-6 w-32" /><Skeleton className="h-4 w-24 mt-2" /></div></CardHeader><CardContent><Skeleton className="h-4 w-40" /></CardContent></Card>
          <Card><CardHeader><Skeleton className="h-6 w-24" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></CardContent></Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Card><CardHeader><Skeleton className="h-6 w-40" /><Skeleton className="h-4 w-48 mt-2" /></CardHeader><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
          <Card><CardHeader><Skeleton className="h-6 w-40" /><Skeleton className="h-4 w-48 mt-2" /></CardHeader><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardHeader><Skeleton className="h-6 w-32" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
        <Card><CardHeader><Skeleton className="h-6 w-32" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
        <Card><CardHeader><Skeleton className="h-6 w-32" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
      </div>
    </div>
  )
}
