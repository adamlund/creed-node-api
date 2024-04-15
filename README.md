# Creed Interactive Node Developer Challenge

A simple, straighforward, minimalist NestJS API example to illustrate working in NodeJS projects. 
- Challenge Response By - [Adam Lund](https://github.com/adamlund)

## Stack
* [Docker](https://www.docker.com/get-started/) for containerized development of the app and its dependencies.
* [NestJS](https://github.com/nestjs/nest) API server.
* [MySQL](https://www.mysql.com/) db.
* [Knex](https://knexjs.org/) and [Objection](https://vincit.github.io/objection.js/) to provide a flexible ORM for table modelling, entity management, and queries.

## Install & Run

A `Makefile` is provided for convenience, but you can also directly access the `docker compose` commands directly.

```bash
$ npm install
$ make build    # docker compose up --build

# In a second terminal...
$ make migrate  # add tables & schema
$ make data     # insert/update sample data
```

## Query the API

With app running `GET` for the following route.

[`http://localhost:3000/podcasts/best_podcasts`](http://localhost:3000/podcasts/best_podcasts)

Supported route params

| Param   | Type  | Required | Valid Values |
| ------- | ----- | -------- | ------------ |
| page    | int   | no |  1-n |
| page_size    | int   | no |  5-50 |
| genre_id   | int   | no | 67,140, etc |
| safe_mode   | int   | no | 0 : 1 |
| region   | string   | no | us, uk, ca, au |

See [swagger page](http://localhost:3000/api) for complete docs.

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov

# e2e tests run using docker
$ make e2e
```

