'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const nextPath = searchParams.get('next') || '/admin/journal'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const payload = await response.json()

    if (!response.ok) {
      setError(payload.error || 'Login failed')
      setLoading(false)
      return
    }

    router.push(nextPath)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200">Username</label>
        <Input value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full rounded-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
