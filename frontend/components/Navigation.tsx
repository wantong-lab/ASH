import type React from "react"
import { useState } from "react"
import { Rss, Twitter, Podcast } from "lucide-react"
import { t } from "../utils/i18n"

const Navigation: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const categories = [
    { name: "RSS 订阅源", icon: <Rss size={18} /> },
    { name: "社交媒体", icon: <Twitter size={18} /> },
    { name: "播客", icon: <Podcast size={18} /> },
  ]

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <h2 className="text-lg font-semibold mb-4">{t("categories")}</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="mb-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="flex items-center w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
              <span className="ml-auto">{expandedCategories.includes(category.name) ? "▼" : "▶"}</span>
            </button>
            {expandedCategories.includes(category.name) && (
              <ul className="ml-6 mt-2">
                <li>
                  <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                    Subcategory 1
                  </button>
                </li>
                <li>
                  <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                    Subcategory 2
                  </button>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

