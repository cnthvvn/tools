# Devoxx France 2023 - Tools Demo

![ToolsProject](https://res.cloudinary.com/athena-com/image/upload/v1681145322/tools-project_hk9rky.png)

# What's in the stack

- Production-ready [Supabase Database](https://supabase.com/)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- My favorite collection of utils by my Master [@rphlmr](https://github.com/rphlmr/dev-toolbox)

# Development

- Create a [Supabase Database](https://supabase.com/) (free tier gives you 2 databases)
- Go to https://app.supabase.com/project/{PROJECT}/settings/database to find your secrets

  ![database_secrets](https://res.cloudinary.com/athena-com/image/upload/v1681146223/supabase-uri_eebfbf.png)

- Add your `DATABASE_URL` in the `.env` file

```en
DATABASE_URL="postgres://postgres:{POSTGRES_PASSWORD}@db.{YOUR_INSTANCE_NAME}.supabase.co:5432/postgres"
```

# Seed the database

```sh
npm run setup
```

# Start the server

```sh
npm run dev
```
