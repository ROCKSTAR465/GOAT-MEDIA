"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Pie, PieChart, Cell } from "recharts"
import { Briefcase, DollarSign, Activity, CheckCircle, ArrowUp, ArrowDown } from "lucide-react"
import { NumberTicker } from "@/components/ui/number-ticker"
import { Skeleton } from "@/components/ui/skeleton"
import { ExecutiveDashboardData, Lead } from "@/lib/types"

const iconMap = {
    leads: Briefcase,
    revenue: DollarSign,
    activeCampaigns: Activity,
    pendingApprovals: CheckCircle,
};

export default function ExecutiveDashboardPage() {
    const [data, setData] = React.useState<ExecutiveDashboardData | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/executive/dashboard');
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

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!data) {
        return <div>No data found.</div>;
    }

    const { user, summaryCards, revenueByClientData, revenueTrendData, expensesProfitData, pipelineLeads } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Executive Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}.</p>
        </div>
        <p className="text-sm text-muted-foreground italic">&quot;Vision without execution is just hallucination.&quot;</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(summaryCards).map(([key, card]: [string, { value: number; change: number }]) => {
          const Icon = iconMap[key as keyof typeof iconMap] || Activity;
          return (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <NumberTicker value={card.value} />
                  {key === 'revenue' && ' USD'}
                </div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {card.change !== 0 ? (<> {card.change > 0 ? <ArrowUp className="h-4 w-4 text-green-500" /> : <ArrowDown className="h-4 w-4 text-red-500" />} {card.change}% vs last month </>) : ('No change')}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenue by Client</CardTitle><CardDescription>Distribution of total revenue by client.</CardDescription></CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64 w-full">
              <PieChart><ChartTooltip content={<ChartTooltipContent />} /><Pie data={revenueByClientData} dataKey="revenue" nameKey="client" cx="50%" cy="50%" outerRadius={80} label>{revenueByClientData.map((entry: { fill: string }, index: number) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}</Pie></PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader><CardTitle>Revenue Growth Trend</CardTitle><CardDescription>Month-over-month revenue trends.</CardDescription></CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64 w-full">
              <LineChart data={revenueTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" /><YAxis tickFormatter={(value) => `$${value/1000}k`} /><ChartTooltip content={<ChartTooltipContent />} /><Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} /></LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader><CardTitle>Expenses vs. Profit</CardTitle><CardDescription>Compare income with operational costs.</CardDescription></CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="h-64 w-full">
                <BarChart data={expensesProfitData} stackOffset="sign" margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" /><YAxis tickFormatter={(value) => `$${value/1000}k`} /><ChartTooltip content={<ChartTooltipContent />} /><Bar dataKey="profit" fill="hsl(var(--chart-1))" stackId="a" radius={[4, 4, 0, 0]} /><Bar dataKey="expenses" fill="hsl(var(--chart-2))" stackId="a" /></BarChart>
             </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Pipeline Preview</CardTitle><CardDescription>Latest leads with quick status badges.</CardDescription></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Lead</TableHead><TableHead>Status</TableHead><TableHead>Assigned</TableHead></TableRow></TableHeader>
                    <TableBody>{pipelineLeads.map((lead: Lead) => (<TableRow key={lead.id}><TableCell className="font-medium">{lead.client_name}</TableCell><TableCell><Badge variant="outline">{lead.status}</Badge></TableCell><TableCell>{lead.assigned}</TableCell></TableRow>))}</TableBody>
                </Table>
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
                <div><Skeleton className="h-8 w-64" /><Skeleton className="h-4 w-80 mt-2" /></div>
                <Skeleton className="h-4 w-48" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-4" /></CardHeader><CardContent><Skeleton className="h-6 w-32" /><Skeleton className="h-3 w-40 mt-1" /></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-4" /></CardHeader><CardContent><Skeleton className="h-6 w-32" /><Skeleton className="h-3 w-40 mt-1" /></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-4" /></CardHeader><CardContent><Skeleton className="h-6 w-32" /><Skeleton className="h-3 w-40 mt-1" /></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-4" /></CardHeader><CardContent><Skeleton className="h-6 w-32" /><Skeleton className="h-3 w-40 mt-1" /></CardContent></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-2"><CardHeader><Skeleton className="h-6 w-40" /><Skeleton className="h-4 w-48 mt-2" /></CardHeader><CardContent><Skeleton className="h-64 w-full" /></CardContent></Card>
                <Card className="lg:col-span-3"><CardHeader><Skeleton className="h-6 w-40" /><Skeleton className="h-4 w-48 mt-2" /></CardHeader><CardContent><Skeleton className="h-64 w-full" /></CardContent></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3"><CardHeader><Skeleton className="h-6 w-40" /><Skeleton className="h-4 w-48 mt-2" /></CardHeader><CardContent><Skeleton className="h-64 w-full" /></CardContent></Card>
                <Card className="lg:col-span-2"><CardHeader><Skeleton className="h-6 w-40" /><Skeleton className="h-4 w-48 mt-2" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
            </div>
        </div>
    )
}
