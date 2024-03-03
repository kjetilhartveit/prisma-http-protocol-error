The prisma set up is based on https://prismaio.notion.site/Prisma-Vercel-Edge-Functions-and-Middleware-9e6f2a3bdb2a409caa9f8e4dba9e9bae using the PlanetScale serverless drivers from @prisma/adapter-planetscale.

**Discovery:** it seems the error is thrown when attempting to create the tables via `prisma db push` so running the snippet with `prisma.$queryRaw()` is unecessary for now.

# How to re-produce

1. Run `npm install`
2. Run `npx prisma db push`
3. ~~Start docker with `docker compose up`~~
4. ~~Run `node index.js`~~

# Prerequites

- ~~MySQL server named prisma-http-protocol-error~~
- ~~node~~
- ~~docker~~

# Error

The output is the following:

```bash
$ npx prisma db push
Environment variables loaded from .env
Prisma schema loaded from schema.prisma
Datasource "db": MySQL database

Error: Prisma schema validation - (get-config wasm)
Error code: P1012
error: Error validating datasource `db`: the URL must start with the protocol `mysql://`.
  -->  schema.prisma:11
   |
10 |   provider = "mysql"
11 |   url      = env("DATABASE_URL")
   |

Validation Error Count: 1
[Context: getConfig]

Prisma CLI Version : 5.11.0-integration-fix-non-ascii.1
```
