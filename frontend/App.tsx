import type React from "react"
import { useState } from "react"
import Navigation from "./components/Navigation"
import FeedView from "./components/FeedView"
import DailyBriefing from "./components/DailyBriefing"
import SearchBar from "./components/SearchBar"
import { ThemeProvider } from "./contexts/ThemeContext"
import { t } from "./utils/i18n"

const App: React.FC = () => {
  const [view, setView] = useState<"timeline" | "smart">("timeline")
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent")

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navigation />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            <SearchBar />
            <div className="mb-4 flex justify-between items-center">
              <div>
                <button
                  onClick={() => setView("timeline")}
                  className={`mr-2 px-3 py-1 rounded ${
                    view === "timeline" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {t("timeline")}
                </button>
                <button
                  onClick={() => setView("smart")}
                  className={`px-3 py-1 rounded ${
                    view === "smart" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {t("smartView")}
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recent" | "popular")}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
              >
                <option value="recent">{t("mostRecent")}</option>
                <option value="popular">{t("mostPopular")}</option>
              </select>
            </div>
            <DailyBriefing />
            <FeedView view={view} sortBy={sortBy} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App

