# Northcoders House of Games API - BIN QIU

See how it works live here:

https://be-nc-games-workplace.onrender.com/api/

## Introduction

Welcome! This is a backend service project of the Northcoders Bootcamp. It provides several endpoints for users to interact with database to retrieve and/or post reviews and comments etc. Clients can also add serveral queries to filter or order the result. The project is build with express, node-postgres and tested with TDD using Jest.

Prerequisite -

**Node.js: v18.2.0 & above required.**

**Postgres: v12.9 & above required.**

## Clone & Setup

1. Use Github _fork_ and _clone_ to copy the repo into your local desired directory.
2. Run **npm install** to install all the required dependencies for the code to run in your machine.

## Connect to Database and Seeding on Your Local Computer

1. You will need to create two `Environment Variables` files: `.env.test` and `.env.development` in order to successfully connect to the two databases locally for development and test purposes. Into each, add `PG_DATABASE=<database_name_here>` and other configurations, which you can find examples in `.env_example` file (see /db/setup.sql for the default database names). Double check that these .env.\* files are .git ignored :).
2. Run **npm run setup-dbs** in the terminal to create the Database.
3. Run **npm run seed** to seed the Database.

The project should be now ready to run on your local machine.

## Test

Run **npm t test_file_name** to test each api functionality. You can find the test files in the `__test__`directory.

OBs: Run **npm run start** before if you want test it with your browser or `Insomnia` or `Postman`.
