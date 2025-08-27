"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, CheckCircle, Smile, ThumbsUp, ThumbsDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const feedbackData = {
  pendingApprovals: [
    { id: 1, project: "Product Demo Video", client: "Quantum Solutions", version: "v3", dueDate: "2024-09-16" },
    { id: 2, project: "Testimonial Ad", client: "Innovate Inc.", version: "v2", dueDate: "2024-09-18" },
  ],
  revisionRequests: [
    { id: 1, project: "Product Demo", user: "Client", avatar: "/avatars/client1.jpg", time: "2 hours ago", request: "Can we change the background music at 0:45? Something more upbeat." },
    { id: 2, project: "Product Demo", user: "Maria G.", avatar: "/avatars/maria.jpg", time: "1 hour ago", request: "Sure, I'll send over a few options." },
    { id: 3, project: "Testimonial Ad", user: "Client", avatar: "/avatars/client2.jpg", time: "1 day ago", request: "Please update the logo to the new version sent over this morning." },
  ],
  satisfactionData: [
      { name: "Jan", score: 82 },
      { name: "Feb", score: 85 },
      { name: "Mar", score: 83 },
      { name: "Apr", score: 88 },
      { name: "May", score: 90 },
      { name: "Jun", score: 88 },
  ]
};

// Chart configuration for better tooltip styling
const satisfactionConfig = {
  score: {
    label: "Satisfaction Score",
    color: "hsl(var(--chart-1))",
  },
};

export default function ClientFeedbackPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2"><MessageSquare className="h-8 w-8" /> Client Feedback</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5" /> Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {feedbackData.pendingApprovals.map(item => (
                    <Card key={item.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">{item.project} ({item.version})</h3>
                                <p className="text-sm text-muted-foreground">{item.client} - Due: {item.dueDate}</p>
                            </div>
                            <div>
                                <Button className="mr-2"><ThumbsUp className="h-4 w-4 mr-2"/>Approve</Button>
                                <Button variant="outline"><ThumbsDown className="h-4 w-4 mr-2"/>Request Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Revision Request Threads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {feedbackData.revisionRequests.map(item => (
                        <div key={item.id} className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={item.avatar} />
                                <AvatarFallback>{item.user.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{item.user}</p>
                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-secondary mt-1">
                                    <p className="text-sm">{item.request}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Smile className="h-5 w-5" /> Client Satisfaction Over Time</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                    <ChartContainer config={satisfactionConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={feedbackData.satisfactionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[70, 100]}/>
                                <ChartTooltip
                                    content={<ChartTooltipContent indicator="line" />}
                                />
                                <Line type="monotone" dataKey="score" name="Satisfaction Score" stroke="var(--color-score)" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
