'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    })

    const payload = await response.json()
    setSaving(false)

    if (!response.ok) {
      setError(payload.error || 'Password update failed.')
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setSuccess('Password updated successfully.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200">Current password</label>
        <Input
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200">New password</label>
        <Input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          autoComplete="new-password"
        />
        <p className="text-xs text-slate-500">
          Use at least 10 characters. A longer passphrase is safer.
        </p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200">Confirm new password</label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
        />
      </div>
      {error ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {success}
        </p>
      ) : null}
      <Button type="submit" className="rounded-full px-6" disabled={saving}>
        {saving ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  )
}
