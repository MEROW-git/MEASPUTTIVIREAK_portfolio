import sanitizeHtml from 'sanitize-html'

const attempts = new Map<string, { count: number; resetAt: number }>()

export const maxUploadSize =
  Number(process.env.MAX_FILE_SIZE || 5 * 1024 * 1024)

export async function loginRateLimit(ip: string) {
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000)
  const maxAttempts = Number(process.env.LOGIN_RATE_LIMIT_MAX || 5)
  const now = Date.now()
  const existing = attempts.get(ip)

  if (!existing || now > existing.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: maxAttempts - 1 }
  }

  if (existing.count >= maxAttempts) {
    return { success: false, remaining: 0 }
  }

  existing.count += 1

  return {
    success: true,
    remaining: Math.max(0, maxAttempts - existing.count),
  }
}

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, '').trim()
}

export function slugify(value: string) {
  return sanitizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function sanitizeRichContent(value: string) {
  return sanitizeHtml(value, {
    allowedTags: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'blockquote',
      'code',
      'pre',
      'h1',
      'h2',
      'h3',
      'h4',
      'ul',
      'ol',
      'li',
      'a',
      'img',
      'span',
      'hr',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title'],
      span: ['style'],
      code: ['class'],
      pre: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'data'],
    allowedStyles: {
      span: {
        color: [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(/, /^[a-zA-Z]+$/],
      },
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        rel: 'noopener noreferrer',
        target: '_blank',
      }),
    },
  })
}

export function stripHtml(value: string) {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
}

export function buildExcerpt(content: string, fallback = '', maxLength = 180) {
  const plain = stripHtml(content).replace(/\s+/g, ' ').trim() || fallback.trim()

  if (plain.length <= maxLength) return plain

  return `${plain.slice(0, maxLength).trimEnd()}...`
}

export function sanitizeTagList(tags: string[]) {
  return tags
    .map((tag) => sanitizeText(tag))
    .filter(Boolean)
    .slice(0, 8)
}
