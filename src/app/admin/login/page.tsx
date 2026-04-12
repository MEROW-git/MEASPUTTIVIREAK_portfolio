import { LoginForm } from '@/components/admin/login-form'

export const metadata = {
  title: 'Private Login',
}

export default function AdminLoginPage() {
  return (
    <main className="shell flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="panel p-8">
          <p className="eyebrow">Private Access</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Journal management only
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            This dashboard is intentionally narrow in scope. It exists only to manage
            journal posts: draft, edit, publish, unpublish, preview, and cover images.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-cyan-400/20 bg-cyan-400/5 p-5 text-sm leading-7 text-cyan-50">
            This route is intentionally not linked from the public navigation. Use your
            private admin URL and environment-configured credentials to sign in.
          </div>
        </section>
        <section className="panel p-8">
          <p className="text-lg font-semibold text-white">Sign in</p>
          <p className="mt-2 text-sm text-slate-400">
            Authentication uses an HTTP-only session cookie and server-side route
            protection.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  )
}
