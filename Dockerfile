FROM node:22-bookworm-slim AS base

FROM base AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy application source
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Provide a dummy DATABASE_URI during build. 
# We verified Next.js safely logs a DB error but still finishes compilation.
ENV DATABASE_URI="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Security: Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Ensure local media storage directory exists and is writable
RUN mkdir -p /app/public/media && chown nextjs:nodejs /app/public/media

# Copy standalone output and static files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Note: migrations are NOT run here. They are executed explicitly via `npm run payload migrate`.
CMD ["node", "server.js"]
