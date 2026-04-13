import { redirect } from 'next/navigation'

import { PUBLIC_ADMIN_LOGIN_PATH } from '@/lib/admin-route'

export default function PrivateEntryPage() {
  redirect(PUBLIC_ADMIN_LOGIN_PATH)
}
