'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h2 className="h2 text-light-100">Something went wrong!</h2>
      <p className="body-2 text-light-200">{error.message}</p>
      <button
        className="primary-btn px-6 py-2"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
