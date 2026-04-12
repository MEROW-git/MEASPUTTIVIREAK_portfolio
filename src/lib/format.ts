export function formatDate(value: string | Date | null | undefined) {
  if (!value) return 'Draft'

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
