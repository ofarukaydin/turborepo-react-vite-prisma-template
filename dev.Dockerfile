FROM node:18-slim AS base
RUN apt-get update
RUN apt-get install -y openssl

RUN yarn global add pnpm
WORKDIR /app
COPY . .

RUN pnpm install
RUN pnpm generate:prisma
RUN pnpm migrate:dev

EXPOSE 3000
EXPOSE 3001

CMD ["pnpm", "dev"]

