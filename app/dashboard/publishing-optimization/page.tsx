"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Share2, TrendingUp, Beaker, Calendar, BarChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const publishingData = {
  recentPosts: [
    { id: 1, title: "AI in 2025", platform: "YouTube", views: "10.2k", likes: "1.1k", comments: 234 },
    { id: 2, title: "#TechLifestyle Reel", platform: "Instagram", views: "54.8k", likes: "8.2k", comments: 789 },
    { id: 3, title: "Viral Gadget TikTok", platform: "TikTok", views: "1.2M", likes: "250k", comments: "4.5k" },
  ],
  abTests: [
      { id: 1, item: "Thumbnail: Product Demo", variantA: "Blue background", variantB: "Gold background", winner: "B (+15% CTR)" },
      { id: 2, item: "Title: Client Testimonial", variantA: "'How we 10xed ROI'", variantB: "'A Client's Success Story'", winner: "A (+22% Views)" },
  ],
  upcomingPosts: [
      { date: "2024-09-16", title: "New Blog Post", platform: "Website" },
      { date: "2024-09-17", title: "Weekly Newsletter", platform: "Email" },
  ],
  performanceData: [
      { name: "Week 1", views: 120000 },
      { name: "Week 2", views: 180000 },
      { name: "Week 3", views: 160000 },
      { name: "Week 4", views: 210000 },
  ]
};

// Chart configuration for better tooltip styling
const performanceConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
};

export default function PublishingOptimizationPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2"><Share2 className="h-8 w-8" /> Publishing & Optimization</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Recent Posts Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Platform</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Likes</TableHead>
                            <TableHead>Comments</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {publishingData.recentPosts.map(post => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell><Badge>{post.platform}</Badge></TableCell>
                                <TableCell>{post.views}</TableCell>
                                <TableCell>{post.likes}</TableCell>
                                <TableCell>{post.comments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Beaker className="h-5 w-5" /> A/B Testing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {publishingData.abTests.map(test => (
                        <Card key={test.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{test.item}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">A: {test.variantA}</p>
                                <p className="text-sm">B: {test.variantB}</p>
                                <p className="text-sm font-bold mt-2">Winner: <Badge>{test.winner}</Badge></p>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Upcoming Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    {publishingData.upcomingPosts.map(post => (
                         <div key={post.title} className="flex items-center justify-between p-2 rounded-lg bg-secondary mb-2">
                            <div>
                                <p className="font-medium">{post.title}</p>
                                <p className="text-xs text-muted-foreground">{post.date}</p>
                            </div>
                            <Badge>{post.platform}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5" /> Performance Over Time (Views)</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
                <ChartContainer config={performanceConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={publishingData.performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
