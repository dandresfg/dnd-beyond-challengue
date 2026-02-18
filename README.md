# D&D Beyond Challenge
<img width="1415" height="344" alt="image" src="https://github.com/user-attachments/assets/30b4e634-61b2-4b3e-9142-f3b9a4735704" />



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
bun run dev:ui    # UI only (Vite) ::5173
bun run dev:api   # API only (NestJS) ::3000
```

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


## After Install
- **Try UI** [here](http://localhost:5173).
- **Swagger docs** are [here](http://localhost:3000/api/docs).
