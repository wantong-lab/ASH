import type React from "react"
import FeedItem from "./FeedItem"

interface FeedViewProps {
  view: "timeline" | "smart"
  sortBy: "recent" | "popular"
}

const FeedView: React.FC<FeedViewProps> = ({ view, sortBy }) => {
  // This would be replaced with actual data fetching logic
  const feedItems = [
    { id: 1, title: "Sample Article 1", source: "RSS Feed", type: "article" },
    { id: 2, title: "Sample Tweet", source: "Twitter", type: "social" },
    { id: 3, title: "Sample Video", source: "YouTube", type: "video" },
  ]

  const sortedItems = [...feedItems].sort((a, b) => {
    if (sortBy === "popular") {
      // This would be replaced with actual popularity logic
      return Math.random() - 0.5
    }
    return 0 // For 'recent', we assume the items are already in order
  })

  const groupedItems =
    view === "smart"
      ? sortedItems.reduce(
          (acc, item) => {
            if (!acc[item.type]) acc[item.type] = []
            acc[item.type].push(item)
            return acc
          },
          {} as Record<string, typeof feedItems>,
        )
      : { timeline: sortedItems }

  return (
    <div>
      {Object.entries(groupedItems).map(([group, items]) => (
        <div key={group}>
          {view === "smart" && <h3 className="text-xl font-semibold mb-2 capitalize">{group}</h3>}
          {items.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default FeedView

