import { getCurrentUserFromCookies } from '@/lib/auth'
import { ChangePasswordForm } from '@/components/admin/change-password-form'

export const metadata = {
  title: 'Security Settings',
}

export default async function AdminSettingsPage() {
  const user = await getCurrentUserFromCookies()

  return (
    <section className="space-y-5">
      <div>
        <p className="eyebrow">Security</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Change your password</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          Update the password for your private CMS account. You will need your current
          password before a new one can be saved.
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="panel p-6">
          <p className="text-lg font-semibold text-white">Account</p>
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-sm text-slate-400">Username</p>
              <p className="mt-1 text-white">{user?.username || 'Unknown user'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-1 break-all text-white">{user?.email || 'Unknown email'}</p>
            </div>
          </div>
        </div>
        <div className="panel max-w-2xl p-6">
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  )
}
