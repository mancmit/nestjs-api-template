Run step for first time
    Create new Postgresql database, new schema
    Config database to .env file
    npm i
    Delete all exist file in ./src/migration
    NAME=user npm run migrate:generate
    npm run migrate:run
    npm start