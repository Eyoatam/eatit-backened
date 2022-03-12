# Eatit-Server

## Project setup

## Enviromental Variables

```
PORT=""
DB_CONN_STRING=""
DB_NAME=""
JWT_KEY="
DB_COLLECTION_NAME=""
USERS_COLLECTION_NAME=""
FOODS_COLLECTION_NAME=""
SHARED_FOODS_COLLECTION_NAME=""
```

### Using Docker

```bash
# clone repo
git clone https://github.com/Eyoatam/Eatit-Server.git

# build image
docker build -t eatit-api .

# create and start the container
docker compose up
```

### Or

```bash
# clone repo
git clone https://github.com/Eyoatam/Eatit-api.git

# install dependencies
yarn

# start dev server
yarn dev

# compile ts
yarn build

# build and start the server
yarn start
```
