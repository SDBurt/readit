# Readit, a Reddit Clone
Build following this [tutorial](https://www.youtube.com/watch?v=SFTgReTlzws&list=PLMhAeHCz8S38HfrRtzfzFD5NTbjgQxcpD&ab_channel=Classsed) by [Classsed](https://www.youtube.com/channel/UC2-slOJImuSc20Drbf88qvg) on Youtube.

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file

example:

```json
{
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "",
   "password": "",
   "database": "readit",
   "synchronize": false,
   "logging": true,
   "entities": [
      "src/entities/**/*.ts"
   ],
   "migrations": [
      "src/migrations/**/*.ts"
   ],
   "subscribers": [
      "src/subscribers/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entities",
      "migrationsDir": "src/migrations",
      "subscribersDir": "src/subscribers"
   }
}
```

3. Create a `.env` file with variables shown below

```bash
PORT=<port>
NODE_ENV=development

APP_URL=<server url>
ORIGIN=<client url>
JWT_SECRET=<some large randomized string>
```

4. Run `npm start` command
