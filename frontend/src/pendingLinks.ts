import type { MouseEvent } from 'react'

export function preventPendingNavigation(event: MouseEvent<HTMLAnchorElement>) {
  if (event.currentTarget.getAttribute('href')?.startsWith('#pendiente-')) {
    event.preventDefault()
  }
}
