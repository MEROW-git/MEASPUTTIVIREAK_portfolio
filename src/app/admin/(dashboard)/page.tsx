import { redirect } from 'next/navigation'

import { PUBLIC_ADMIN_DASHBOARD_PATH } from '@/lib/admin-route'

export default function AdminIndexPage() {
  redirect(PUBLIC_ADMIN_DASHBOARD_PATH)
}
