"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Label } from "@/components/ui/label"
import { Film } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

export default function ContentStudioPage() {
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateContent = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const sampleContent = `🎯 CONTENT PACK GENERATED - TechStart Solutions

📝 SCRIPT 1: "The Hidden Cost of Manual Processes"
Hook: "Your team spends 40% of their time on tasks a robot could do..."
CTA: Book a free automation audit

📝 SCRIPT 2: "Why 90% of Startups Fail at Scaling"
Hook: "The difference between a ₹10L company and ₹1Cr company isn't what you think..."
CTA: Download our scaling blueprint

📝 SCRIPT 3: "The 3-Minute Rule That Doubled Our Productivity"
Hook: "If you can't explain your process in 3 minutes, it's broken..."
CTA: Get our process optimization checklist

📝 SCRIPT 4: "From Chaos to System: A Real Transformation"
Hook: "6 months ago, this CEO was working 80-hour weeks..."
CTA: Watch the full case study

📝 SCRIPT 5: "The Automation Myth That's Costing You Money"
Hook: "Everyone thinks automation is expensive. Here's the truth..."
CTA: Calculate your automation ROI

✅ All scripts include:
- Platform-specific formatting (IG/YT/FB)
- B-roll suggestions
- Engagement hooks
- Clear CTAs aligned with funnel stage
- Brand voice consistency check passed`

      setGeneratedContent(sampleContent)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Film className="h-8 w-8" /> Content Studio
          </h1>
          <p className="text-gray-400 mt-1">AI-powered content generation and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle>AI Content Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Client/Brand</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techstart">TechStart Solutions</SelectItem>
                  <SelectItem value="digital">Digital Innovations</SelectItem>
                  <SelectItem value="growth">GrowthCorp</SelectItem>
                  <SelectItem value="brand">BrandBoost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Content Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Awareness Content</SelectItem>
                  <SelectItem value="conversion">Conversion Content</SelectItem>
                  <SelectItem value="mixed">Mixed Pack (5+5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Target Platform</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram Reels</SelectItem>
                  <SelectItem value="youtube">YouTube Shorts</SelectItem>
                  <SelectItem value="facebook">Facebook Reels</SelectItem>
                  <SelectItem value="all">All Platforms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateContent} disabled={isGenerating} className="w-full">
              <Film className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Content Pack"}
            </Button>
          </CardContent>
        </Card>

        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle>Content Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { stage: "Script Generation", status: "completed", count: 5 },
                { stage: "Review & Approval", status: "in-progress", count: 3 },
                { stage: "Shoot Planning", status: "pending", count: 2 },
                { stage: "Post Production", status: "pending", count: 0 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.status === "completed"
                          ? "bg-green-400"
                          : item.status === "in-progress"
                            ? "bg-yellow-400 animate-pulse"
                            : "bg-gray-400"
                      }`}
                    />
                    <span>{item.stage}</span>
                  </div>
                  <Badge variant="outline">{item.count} items</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {generatedContent && (
        <Card className="relative">
          <BorderBeam />
          <CardHeader>
            <CardTitle>Generated Content Pack</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedContent}
              readOnly
              className="min-h-[400px] font-mono text-sm resize-none"
            />
            <div className="flex gap-3 mt-4">
              <Button>Approve Content</Button>
              <Button variant="outline">Request Revisions</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
