# D&D Beyond Challenge

D&D 5e HP Management — API (NestJS) and UI (React + Vite).

## Prerequisites

- [Bun](https://bun.sh/) — install it and you're set; it handles dependencies and running the app.
- For running both servers at once, install concurrently globally (one-time):

  ```bash
  bun add -g concurrently
  ```

## Install

From the project root:

```bash
bun run install:all
```

Copy the API env template so the API can run:

```bash
cp api/.env.example api/.env
```

(On Windows PowerShell: `Copy-Item api\.env.example api\.env`)

This installs dependencies in both `api` and `ui` (no root dependencies).

## Run

**Both servers (API + UI):**

```bash
bun dev # Requires concurrently
```

**Optional — run each server on its own:**

```bash
bun run dev:ui    # UI only (Vite dev server)
bun run dev:api   # API only (NestJS)
```

With the API running, **Swagger docs** are [here](http://localhost:3000/api/docs).

## Database (API)

The API uses **SQLite** by default (no extra setup).

**Optional — use MySQL with Docker:**

1. From the `api` folder, start MySQL:

   ```bash
   cd api && docker-compose up -d
   ```

2. In `api/.env`, set:

   ```
   DB_TYPE=mysql
   ```
