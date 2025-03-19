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

## 💻 Development

For detailed setup instructions, please see [DEVELOPMENT.md](./DEVELOPMENT.md).

### Quick Start

```bash
# Clone and setup
git clone git@github.com:xiaoyu2er/hero-tanstack-app.git
cd hero-tanstack-app
pnpm install
cp .env.example .env

# Database setup (with Supabase + Docker)
pnpm db:init
pnpm db:start

# Generate schema and apply migrations
pnpm db:generate
pnpm db:migrate

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application running.