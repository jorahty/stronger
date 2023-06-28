# Stronger

A platform to connect people looking for a gym partner

## Installation

1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Install Node packages: `npm install`
3. Create `.env` file at the root of the project:
   ```
   POSTGRES_DB=dev
   POSTGRES_USER=some-user
   POSTGRES_PASSWORD=some-password
   ```
4. Set a JWT secret:
   ```
   export ACCESS_TOKEN=some-long-secret-more-complex-than-this
   ```

## Usage

- Start the database: `docker-compose up -d`
- With the database running, start the dev server: `npm run dev`
- With the dev server running, view the [API testing UI page](http://localhost:4000/v0/api-docs)
- Stop the database: `docker-compose down`
