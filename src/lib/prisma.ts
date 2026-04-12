type PrismaClientLike = Record<string, unknown> | null

declare global {
  // eslint-disable-next-line no-var
  var __portfolioPrisma: PrismaClientLike | undefined
}

function createPrismaClient(): PrismaClientLike {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require('@prisma/client')

    if (!global.__portfolioPrisma) {
      global.__portfolioPrisma = new PrismaClient()
    }

    return global.__portfolioPrisma
  } catch {
    return null
  }
}

const prisma = createPrismaClient()

export function hasPrismaClient() {
  return Boolean(prisma)
}

export default prisma
