# Northcoders News API

An API to be used for accessing data for articles, topics, users and comments.

## Contents

- [Hosted version](#Hosted-version)

- [Dependencies](#Dependencies)

- [Prerequisites](#Prerequisites)


## Hosted version

You'll find a hosted version of this API on [Heroku](https://powerful-hollows-04803.herokuapp.com/api)


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

Make sure you have the minimum versions of `Node.js` and `Postgres` needed to run the project, as well as installing the above dependencies.

You'll also need to make sure the local databases are set up and seeded. To do this, enter the following to your terminal: npm run setup-dbs

Then this: npm run seed

To run the tests, you'll need to enter the following to your terminal: npm test


