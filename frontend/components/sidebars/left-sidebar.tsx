"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Twitter,
  ImageIcon,
  Youtube,
  Mic,
  Megaphone,
  Star,
  ChevronRight,
  Shield,
  Globe,
  GitFork,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type MediaType = {
  id: string
  label: string
  icon: React.ElementType
  count: number
  color: string
}

type Subscription = {
  id: string
  name: string
  icon: React.ElementType
  count: number
  type: string
}

export default function LeftSidebar() {
  const [activeTag, setActiveTag] = useState<string>("blog")
  const [openCategories, setOpenCategories] = useState<string[]>(["subscriptions"])

  const mediaTypes: MediaType[] = [
    { id: "blog", label: "文章", icon: BookOpen, count: 99, color: "from-orange-500 to-pink-500" },
    { id: "twitter", label: "社交媒体", icon: Twitter, count: 45, color: "from-blue-400 to-blue-600" },
    { id: "image", label: "图片", icon: ImageIcon, count: 23, color: "from-green-400 to-emerald-600" },
    { id: "video", label: "视频", icon: Youtube, count: 12, color: "from-red-500 to-rose-600" },
    { id: "audio", label: "音频", icon: Mic, count: 8, color: "from-purple-400 to-purple-600" },
    { id: "announcement", label: "公告", icon: Megaphone, count: 5, color: "from-yellow-400 to-amber-600" },
  ]

  const allSubscriptions: Subscription[] = [
    { id: "1", name: "网络安全新闻-中文", icon: Shield, count: 1205, type: "blog" },
    { id: "2", name: "国外新闻", icon: Globe, count: 2404, type: "blog" },
    { id: "3", name: "Trending Repos", icon: GitFork, count: 21, type: "blog" },
    { id: "4", name: "Tech Twitter", icon: Twitter, count: 45, type: "twitter" },
    { id: "5", name: "摄影作品展", icon: ImageIcon, count: 23, type: "image" },
    { id: "6", name: "技术讲座", icon: Youtube, count: 12, type: "video" },
    { id: "7", name: "每日播客", icon: Mic, count: 8, type: "audio" },
    { id: "8", name: "产品更新", icon: Megaphone, count: 5, type: "announcement" },
  ]

  const filteredSubscriptions = allSubscriptions.filter((sub) => sub.type === activeTag)

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  return (
    <aside className="w-72 border-r bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <h1 className="font-semibold text-lg mb-4">标签</h1>
        <div className="space-y-2">
          {mediaTypes.map((type) => (
            <HoverCard key={type.id}>
              <HoverCardTrigger asChild>
                <button
                  onClick={() => setActiveTag(type.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 p-2 rounded-lg transition-all",
                    activeTag === type.id
                      ? "bg-gradient-to-r shadow-lg scale-[1.02]"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700",
                    activeTag === type.id ? type.color : "",
                  )}
                >
                  <type.icon
                    className={cn("w-5 h-5", activeTag === type.id ? "text-white" : "text-gray-600 dark:text-gray-300")}
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      activeTag === type.id ? "text-white font-medium" : "text-gray-600 dark:text-gray-300",
                    )}
                  >
                    {type.label}
                  </span>
                  {type.count > 0 && (
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs",
                        activeTag === type.id
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
                      )}
                    >
                      {type.count}
                    </span>
                  )}
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">{type.label}内容统计</h4>
                  <div className="text-xs text-muted-foreground">
                    总计: {type.count} 条内容
                    <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                      <div
                        className={cn("h-full rounded-full bg-gradient-to-r", type.color)}
                        style={{ width: `${Math.min((type.count / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">收藏夹</span>
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
              {filteredSubscriptions.reduce((acc, sub) => acc + sub.count, 0)}
            </span>
          </div>

          <Collapsible
            open={openCategories.includes("subscriptions")}
            onOpenChange={() => toggleCategory("subscriptions")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1">
              <span className="text-sm font-medium">订阅源</span>
              <ChevronRight
                className={cn(
                  "w-4 h-4 text-gray-500 transition-transform",
                  openCategories.includes("subscriptions") ? "transform rotate-90" : "",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1">
              <AnimatePresence>
                {openCategories.includes("subscriptions") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1"
                  >
                    {filteredSubscriptions.map((sub) => (
                      <button
                        key={sub.id}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center space-x-2">
                          <sub.icon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm truncate">{sub.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{sub.count}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </nav>
    </aside>
  )
}

