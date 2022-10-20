# =====
# Base: Setup required build dependencies
FROM node:19-slim AS base
RUN yarn global add turbo@1.5.5 pnpm
WORKDIR /app
ENV SCOPE=backend


# =====
# Pruner: Extract only the application, and it's dependents
FROM base AS pruner
COPY . .
RUN turbo prune --scope=${SCOPE} --docker


# =====
# Builder: Install packages, and build apps/packages
FROM base AS builder

# First install the dependencies (as they change less often)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .
COPY --from=pruner /app/out/pnpm-workspace.yaml .
COPY --from=pruner /app/.npmrc .

RUN pnpm install
RUN pnpm generate:prisma

# Build the project
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=${SCOPE}
RUN mkdir ./out && find ./apps ./packages -name 'dist' -type d -not -path "./node_modules/*" -exec cp -rf --parents '{}' /app/out \;

# =====
# Builder: Remove source code, and dev dependencies
FROM base as prod_build
ENV NODE_ENV=production

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml /app/out/pnpm-workspace.yaml ./
COPY --from=pruner /app/.npmrc .

RUN pnpm install --prod

COPY --from=builder /app/out .

FROM base AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vite
USER vite

COPY --chown=vite:vite --from=prod_build /app/ /app§

CMD node apps/${SCOPE}/dist/app.js