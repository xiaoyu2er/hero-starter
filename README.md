# Hero TanStack App

A modern full-stack React starter template combining the power of [TanStack Start](https://tanstack.com/start/latest), [HeroUI](https://www.heroui.com/), and [Better-Auth](https://www.better-auth.com/).

## 🚀 Features

- **[TanStack Start](https://tanstack.com/start/latest)** - Full-stack React framework with SSR, streaming, server functions, and API routes
- **[HeroUI](https://www.heroui.com/)** - Beautiful, accessible, and customizable React UI components
- **[Better-Auth](https://www.better-auth.com/)** - Comprehensive authentication framework with email/password, social sign-on, and 2FA support
- **Type-safe** - End-to-end type safety with TypeScript
- **Deployment ready** - Easy deployment to Vercel and Netlify

## 🔍 Live Demo

- [Demo](https://hero.tanstack.app)

## 💻 Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- [Docker](https://www.docker.com/) (for local database, optional if you have your own PostgreSQL service)

### Environment Configuration

1. Copy the example environment file to create your local configuration:

```bash
cp .env.example .env
```

2. Update the `.env` file with your own credentials and configuration as needed.

### Database Setup

This project uses PostgreSQL and Prisma as ORM. You can set up your database in one of two ways:

#### Option 1: Using Supabase (local development with Docker)

If you don't have an existing PostgreSQL service, you can use Supabase local development with Docker:

1. Initialize Supabase:

```bash
pnpm db:init
```

2. Start the Supabase local development environment:

```bash
pnpm db:start
```

3. Generate the Prisma schema:

```bash
pnpm db:generate
```

4. Apply the database migrations:

```bash
pnpm db:migrate
```

#### Option 2: Using Your Own PostgreSQL Service

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

### Running the Application

Start the development server:

```bash
pnpm dev
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

### Additional Commands

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