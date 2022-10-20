## What's inside?

This is a monorepo -turborepo to be exact- uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `backend`: an express app
- `frontend`:a vite/react app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

- Frontend port: 3000
- Backend port :3001


### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

To develop all apps and packages inside a docker container, run the following command:

```
docker-compose up -d
```

From there you can use vscode remote extension to connent to the container.
