# 5danauoblacima2023

## Prerequisites

### Container (recommended)

- [Docker](https://docs.docker.com/engine/install/), alternatively use [Podman](https://podman.io/docs/installation)
- [docker-compose](https://docs.docker.com/compose/), alternatively use [podman-compose](https://github.com/containers/podman-compose)

### Local

- [nodejs](https://nodejs.org/en/download)
- Alternatively you can install it via [devbox](https://www.jetpack.io/devbox/)

## Build

### Container (recommended)

- Run `docker compose up` or `docker-compose up` or `podman-compose up`
- Alternatively build `docker/Dockerfile` manually and run a seperate redis container with `docker run` or `podman run`

### Local

1. Install modules with `npm ci`
1. Run dev server with `npm run dev`
1. Alternatively build project with `npm run build` and run it with `npm run start`

## Access (both methods)

1. API should be available under port `3000`, you can check by going to `http://localhost:3000/healthz`
1. To check if Redis is connected go to `http://localhost:3000/healthz/redis`

## Tests (automated)

- To run the audomated tests you must do `Local` setup after which you can start the tests with `npm run test`
- Alternatively you can test the API manually by going to `http://localhost:3000/stats/player/Sifiso%20Abdalla`

## Technologies

- NodeJS - [JavaScript runtime for servers](https://nodejs.org)
- NPM - [Node Package Manager](https://www.npmjs.com/), used to install required packages
- Fastify - [Fast and low overhead web framework](https://fastify.dev/) for NodeJS
- Redis - [Fast in memory data store](https://redis.io/)
- Docker/Podman - [Containerized packaging](https://docs.docker.com/get-started/overview/)
