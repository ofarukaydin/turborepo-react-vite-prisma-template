FROM node:19.0.0-bullseye

ARG NODE_ENV=production

RUN yarn global add pnpm serve
RUN yarn global add turbo@1.5.5

# Set working directory
WORKDIR /app

# Install app dependencies
COPY  ["pnpm-lock.yaml", "package.json", "./"]

# Copy source files
COPY . .

# Install app dependencies
RUN pnpm install
# RUN pnpm migrate:dev
# RUN pnpm build

# EXPOSE 3000 3001

# RUN serve /app/apps/frontend/dist
# CMD ["node", "/app/apps/backend/dist/app.js"]