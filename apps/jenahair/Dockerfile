FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
# Since we use monorepo, we copy the whole monorepo package.json structure to maintain workspaces
COPY apps/jenahair/package.json ./apps/jenahair/
COPY apps/the-local-travel/package.json ./apps/the-local-travel/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/

RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build time vars
ARG VERSION
ARG API_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

ENV VERSION=$VERSION
ENV API_URL=$API_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# Build the jenahair app (assumes "build" script is configured correctly inside apps/jenahair)
RUN npm run build --workspace=jenahair.com

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ARG VERSION
ARG API_URL
ENV VERSION=$VERSION
ENV API_URL=$API_URL

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/jenahair/public ./apps/jenahair/public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/jenahair/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/jenahair/.next/static ./apps/jenahair/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/jenahair/server.js"]
