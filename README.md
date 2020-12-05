# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file

example:

```
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

3. Run `npm start` command
