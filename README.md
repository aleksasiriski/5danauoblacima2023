# 5danauoblacima2023

## Prerequisites

### Container (recommended)

- [Docker](https://docs.docker.com/engine/install/)
- Alternatively use [Podman](https://podman.io/docs/installation)

- [docker-compose](https://docs.docker.com/compose/)
- Alternatively use [podman-compose](https://github.com/containers/podman-compose)

### Local

- [nodejs](https://nodejs.org/en/download)
- [vite](https://vitejs.dev/guide/)

## Build

### Container (recommended)

- Run `docker-compose up` or `podman-compose up`
- Alternatively build `docker/Dockerfile` manually and run a seperate redis container with `docker run` or `podman run`

### Local

- Install modules with `npm ci`
- Run dev server with `npm run dev`
- Alternatively build project with `npm run build` and run it with `npm run start`

## Access (both methods)

- API should be available under port `3000`, you can check by going to `http://localhost:3000/healthz`
- To check if Redis is connected go to `http://localhost:3000/healthz/redis`

## Tests (automated)

- To run the audomated tests you must do `Local` setup after which you can start the tests with `npm run test`
- Alternatively you can test the API manually by going to `http://localhost:3000/stats/player/Sifiso%20Abdalla`
