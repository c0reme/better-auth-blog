# Better Auth Blog

A modern authentication and blog starter built with Astro, Drizzle ORM, Better Auth, and Svelte framework.

This starter uses Svelte for the frontend. If you prefer to use pure Astro, follow the guide at [Better Auth Astro Integration](https://www.better-auth.com/docs/integrations/astro).

## Getting Started

To set up and manage your project, use the following commands in the project directory:

### Authentication & Database

- `db:generate`: Generate the authentication schema using Better Auth CLI. Outputs to `src/db/auth-schema.ts`.
- `drizzle:generate`: Generate Drizzle ORM schema artifacts.
- `drizzle:migrate`: Run database migrations using Drizzle Kit.

### Development Scripts

- `dev`: Start the Astro development server.
- `build`: Build the Astro project for production.
- `preview`: Preview the production build locally.
- `astro`: Run Astro CLI commands.

These scripts help you efficiently develop, build, and preview your Astro project.

## Project Structure

```
├── src/
│   ├── db/
│   │   └── auth-schema.ts
│   └── ...
├── public/
├── package.json
└── README.md
```

## Learn More

- [Astro Documentation](https://docs.astro.build/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Better Auth Documentation](https://github.com/better-auth/better-auth)

---

Feel free to customize this project to fit your needs!
