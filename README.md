## What's inside?

This is a monorepo -turborepo to be exact- uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `backend`: an express app
- `frontend`:a vite/react app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

- Frontend port: 3000
- Backend port :3001

### Develop

Install dependencies

```
pnpm install
```

Generate prisma client

```
pnpm migrate:dev
```

Run all apps in dev mode

```
pnpm dev
```

If you want to develop all apps and packages inside a docker container instead, run the following command:

```
docker-compose up -d
```

From there you can use vscode remote extension to connent to the container.

### Build

To build all apps and packages, run the following command:

```
pnpm build
```
