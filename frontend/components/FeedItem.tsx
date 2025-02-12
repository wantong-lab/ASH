"use client"

import type React from "react"
import { useState } from "react"
import { MessageSquare, ImportIcon as Translate } from "lucide-react"
import { t } from "../utils/i18n"

interface FeedItemProps {
  item: {
    id: number
    title: string
    source: string
    type: string
  }
}

const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
  const [showSummary, setShowSummary] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {t("source")}: {item.source}
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <MessageSquare size={16} className="mr-1" />
          {t("summary")}
        </button>
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <Translate size={16} className="mr-1" />
          {t("translate")}
        </button>
      </div>
      {showSummary && (
        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-sm">AI-generated summary would appear here.</p>
        </div>
      )}
      {showTranslation && (
        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-sm">Translated content would appear here.</p>
        </div>
      )}
    </div>
  )
}

export default FeedItem

