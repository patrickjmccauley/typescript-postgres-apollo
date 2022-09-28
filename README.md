# typescript-postgres-apollo

Test app to learn Numeral's stack, which includes

- typescript
- sequelize binding (ORM library)
- apollo (graphql server)
- react

This app is a simple app for creating and viewing "posts". Each post contains a text "content" field that is stored in a local database.

## Directory structure

- src/app.ts: main server entrypoint
- src/: server-side code
- src_client/index.ts: main client entrypoint
- src_client/: client-side code (React components, etc)
- lib/: generated, server-side javascript code from typescript; do not edit
- public/js/: generated, client-side javascript code from typescript; do not edit

# Suggested readings

The following materials assume readers with some javascript experience, but zero/little experience with typescript.

## Javascript

- WTF JS (list of javascript-specific oddities that typescript mostly inherits): https://github.com/denysdovhan/wtfjs

## Typescript

- Typescript is Javascript with static typing
- Official doc: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

## GraphQL

- GraphQL is an API query language that shifts request schema definition to the client, so client can ask for exact set of fields it wants, and server would only compute those fields
- Official doc: https://graphql.org/learn/
- Note: GraphQL is merely the query language. The exact implementation is language specific. In typescript, we use `type-graphql` for schema generation (e.g., generating a GraphQL schema from a Class type), and Apollo for serving (see below)

## Apollo

- Apollo is an implementation of GraphQL bindings. It has both a server component (`apollo-server`), which responds to GraphQL requests through HTTP; and a client component (`apollo-client`), which allows client side components (e.g., React components) to make requests through GraphQL.
- Server doc: https://www.apollographql.com/docs/apollo-server/
- Client doc: https://www.apollographql.com/docs/react

# Prerequisite

- Node: v16
- NPM (should come pre-installed with Node)

# Setting up DB

You need to create a Postgres database with the correct name locally. Use the console script below.

```
> psql
> create database typescript_dev;
> create user testuser with encrypted password 'testpw';
> grant all privileges on database typescript_dev to testuser;
```

# Starting your server

First, install dependencies:

```
npm i
```

Start server in watch mode (auto restarts after file change):

```
npm run watch
```

# Containerized version

## Setup runtime
```bash
docker build . -f DockerfilePostgresql -t localhost:5000/typescript-dev-postgresql:0.0.1
docker push localhost:5000/typescript-dev-postgresql:0.0.1

# run the container in detached mode, bind localhost:5431 to portforward to container:5432
docker run -d -p5431:5432 localhost:5000/typescript-dev-postgresql:0.0.1

docker build . -f Dockerfile -t localhost:5000/typescript-postgres-apollo:0.0.1
docker push localhost:5000/typescript-postgres-apollo:0.0.1

# run the app using host network
docker run --network="host" localhost:5000/typescript-postgres-apollo:0.0.1
```

## Hot load
```bash
docker build . -f DockerfileDev -t localhost:5000/typescript-postgres-apollo:dev &&
    docker run -v $(pwd)/src:/home/newuser/src \
    -v $(pwd)/src_client:/home/newuser/src_client \
    -v $(pwd)/views:/home/newuser/views \
    -v $(pwd)/package.json:/home/newuser/package.json \
    -v $(pwd)/tsconfig.json:/home/newuser/tsconfig.json  \
    -v $(pwd)/webpack.config.cjs:/home/newuser/webpack.config.cjs \
    --network="host" \
    localhost:5000/typescript-postgres-apollo:dev
```

easy mode

```bash
bash bin/run-dev.sh
```