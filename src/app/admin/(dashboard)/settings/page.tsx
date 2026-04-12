import { ChangePasswordForm } from '@/components/admin/change-password-form'

export const metadata = {
  title: 'Security Settings',
}

export default function AdminSettingsPage() {
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
      <div className="panel max-w-2xl p-6">
        <ChangePasswordForm />
      </div>
    </section>
  )
}
