"use client"
import { Bell, Settings, Search, RefreshCw } from "lucide-react"

export default function TopNav() {
  return (
    <header className="h-12 border-b flex items-center justify-between px-4 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <button className="text-sm font-medium dark:text-gray-200">文章</button>
        <button className="text-sm font-medium dark:text-gray-200">文章列表</button>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <RefreshCw className="w-4 h-4 dark:text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Search className="w-4 h-4 dark:text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Bell className="w-4 h-4 dark:text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Settings className="w-4 h-4 dark:text-gray-400" />
        </button>
      </div>
    </header>
  )
}

