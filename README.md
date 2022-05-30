# Northcoders News API

An API to be used for accessing data for articles, topics, users and comments. It is also used in the [frontend project](https://github.com/HalfElfAlistair/nc-news).

## Contents

- [Hosted version](#Hosted-version)

- [Cloning](#Cloning)

- [Dependencies](#Dependencies)

- [Prerequisites](#Prerequisites)

## Hosted version

You'll find a hosted version of this API on [Heroku](https://powerful-hollows-04803.herokuapp.com/api)

## Cloning

To use this project locally, use the 'code' button to view the url, and then copy it.

Open your terminal, navigate to the directory you want the repo to be in ('cd '), then enter: 'git clone '. For a more detailed set of instructions, please use this handy guide from the [GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

## Dependencies

### dotenv

To install, enter the following in your terminal: npm install dotenv --save

or

[Follow these instructions](https://www.npmjs.com/package/dotenv)

### express:

To install, enter the following in your terminal: npm init
to create a package.json then: npm install express

or

[Follow these instructions](https://expressjs.com/en/starter/installing.html)

### pg

To install, enter the following in your terminal: npm install pg

or

[Follow these instructions](https://www.npmjs.com/package/pg)

## Prerequisites

### Create Variable environments

To successfully connect to the databases for this project, you'll need to create a file called '.env.development' and '.env.test' which will need to contain the following: 'PGDATABASE=nc_news' and 'PGDATABASE=nc_news_test' respectively.

Make sure you have the minimum versions of `Node.js` (v14.18.1) and `Postgres` (12.9) needed to run the project, as well as installing the above dependencies.

You'll also need to make sure the local databases are set up and seeded. To do this, enter the following to your terminal: npm run setup-dbs

Then this: npm run seed

To run the tests, you'll need to enter the following to your terminal: npm test
