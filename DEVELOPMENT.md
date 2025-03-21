# Development Setup Guide

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- [Docker](https://www.docker.com/) (for local database, optional if you have your own PostgreSQL service)
- [pre-commit](https://pre-commit.com/) (for Git hooks)

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:xiaoyu2er/hero-tanstack-app.git
cd hero-tanstack-app
```

2. Install dependencies:

```bash
pnpm install
```

## Environment Configuration

1. Copy the example environment file to create your local configuration:

```bash
cp .env.example .env
```

2. Update the `.env` file with your own credentials and configuration as needed.

## Database Setup

This project uses PostgreSQL and Prisma as ORM. You can set up your database in one of two ways:

### Option 1: Using Supabase (local development with Docker)

If you don't have an existing PostgreSQL service, you can use Supabase local development with Docker:

1. Initialize Supabase:

```bash
> hero-tanstack-app@ db:init ~/code/hero-tanstack-app
> npx supabase init

Generate VS Code settings for Deno? [y/N] n
Generate IntelliJ Settings for Deno? [y/N] n
Finished supabase init.
```

During initialization, you'll be prompted about generating Deno settings. You can safely skip these by responding with `n`.

2. **Optional: Optimize Supabase Configuration**

   By default, Supabase enables many services that you might not need. You can optimize resource usage by editing the `supabase/config.toml` file and setting `enabled = false` for unused services:

   ```toml
   # Disable services you don't need
   [api]
   enabled = false  # If you don't need the REST API

   [realtime]
   enabled = false  # If you don't need realtime subscriptions

   [storage]
   enabled = false  # If you don't need file storage

   [auth]
   enabled = false  # If you're using Better-Auth instead of Supabase Auth

   [edge_runtime]
   enabled = false  # If you don't need Edge Functions

   [analytics]
   enabled = false  # If you don't need analytics
   ```

   For this project, you only need the database service, so you can disable most other services.

3. Start the Supabase local development environment:

```bash
pnpm db:start
```

4. Generate the Prisma schema:

```bash
pnpm db:generate
```

5. Apply the database migrations:

```bash
pnpm db:migrate
```

### Option 2: Using Your Own PostgreSQL Service

If you already have a local or remote PostgreSQL service:

1. Update your `.env` file with your PostgreSQL connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

2. Generate the Prisma schema:

```bash
pnpm db:generate
```

3. Apply the database migrations:

```bash
pnpm db:migrate
```

## Running the Application

Start the development server:

```bash
pnpm dev
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

## Pre-commit Hooks Setup

This project uses [pre-commit](https://pre-commit.com/) to enforce code quality checks before each commit. Please set up pre-commit hooks before making any pull requests.

1. Install pre-commit:

```bash
pip install pre-commit
```

Or if you prefer:

```bash
brew install pre-commit
```

2. Install the git hook scripts:

```bash
pre-commit install
```

3. The hooks will run automatically on `git commit`, but you can also run them manually:

```bash
pre-commit run --all-files
```

> **IMPORTANT**: Always ensure pre-commit hooks pass successfully before creating a pull request.

## Additional Commands

- Stop the Supabase development environment:
  ```bash
  pnpm db:stop
  ```
- Lint your code:
  ```bash
  pnpm lint
  ```
- Format your code:
  ```bash
  pnpm format
  ```
- Build for production:
  ```bash
  pnpm build
  ```
```