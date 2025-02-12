"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { t } from "../utils/i18n"

const DailyBriefing: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <h2 className="text-xl font-semibold">{t("dailyBriefing")}</h2>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">{t("topStories")}</h3>
          <ul className="list-disc list-inside mb-4">
            <li>重大事件 1</li>
            <li>重大事件 2</li>
            <li>重大事件 3</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">{t("trendingKeywords")}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">关键词 1</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">关键词 2</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">关键词 3</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyBriefing

