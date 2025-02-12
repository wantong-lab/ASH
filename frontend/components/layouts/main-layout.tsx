import type React from "react"
import TopNav from "@/components/navigation/top-nav"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}

