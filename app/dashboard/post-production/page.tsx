"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clapperboard, Share2, UserCheck, Captions, MessageSquare, History } from "lucide-react";

const postProductionData = {
  projects: [
    { name: "Client Testimonial", progress: 80, editor: "Maria G.", status: "Color Grading" },
    { name: "Product Demo", progress: 45, editor: "Alex W.", status: "First Cut" },
    { name: "Behind the Scenes", progress: 20, editor: "Maria G.", status: "Assembling" },
    { name: "IG Reel - Viral Gadget", progress: 95, editor: "David L.", status: "Final Touches" },
  ],
  drafts: [
      { id: 1, project: "Product Demo", version: "v2", status: "Pending Review", feedback: "Change music, shorten intro." },
      { id: 2, project: "Client Testimonial", version: "v4", status: "Approved", feedback: "Looks great!" },
      { id: 3, project: "IG Reel", version: "v1", status: "Pending Review", feedback: "N/A" },
  ],
  exportStatus: [
    { platform: "YouTube (4K)", status: "Complete" },
    { platform: "YT Shorts", status: "Complete" },
    { platform: "IG Reels", status: "In Progress" },
    { platform: "Instagram Feed", status: "Complete" },
    { platform: "Facebook", status: "Pending" },
    { platform: "TikTok", status: "In Progress" },
  ],
};

const getStatusVariant = (status: string) => {
  if (status === "Complete") return "default";
  if (status === "In Progress") return "secondary";
  return "outline";
};

export default function PostProductionPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2"><Clapperboard className="h-8 w-8" /> Post Production</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Project Progress Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {postProductionData.projects.map(project => (
                    <div key={project.name}>
                        <div className="flex justify-between items-center mb-1">
                            <div>
                                <span className="font-medium">{project.name}</span>
                                <span className="text-sm text-muted-foreground ml-2">({project.editor})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">{project.status}</Badge>
                                <span className="text-sm text-muted-foreground">{project.progress}%</span>
                            </div>
                        </div>
                        <Progress value={project.progress} />
                    </div>
                ))}
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5" /> Draft Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Version</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {postProductionData.drafts.map(draft => (
                                <TableRow key={draft.id}>
                                    <TableCell className="font-medium">{draft.project}</TableCell>
                                    <TableCell>{draft.version}</TableCell>
                                    <TableCell><Badge variant={draft.status === 'Approved' ? 'default' : 'destructive'}>{draft.status}</Badge></TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm" className="mr-2"><MessageSquare className="h-4 w-4"/></Button>
                                        <Button variant="outline" size="sm"><History className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Share2 className="h-5 w-5" /> Export Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                        {postProductionData.exportStatus.map(item => (
                            <div key={item.platform} className="flex justify-between items-center p-2 rounded-lg bg-secondary">
                                <span className="text-sm">{item.platform}</span>
                                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
