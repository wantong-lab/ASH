import type React from "react"

export interface Article {
  id: string
  title: string
  content: string
  source: string
  timestamp: string
  type: string
}

export interface Subscription {
  id: string
  name: string
  icon: React.ElementType
  count: number
  type: string
}

export interface MediaType {
  id: string
  label: string
  icon: React.ElementType
  count: number
  color: string
}

