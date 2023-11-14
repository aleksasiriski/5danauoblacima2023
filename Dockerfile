# Adjust NODE_VERSION as desired
ARG NODE_VERSION=lts
FROM node:${NODE_VERSION}-slim as base

# NodeJS app lives here
WORKDIR /app


# Throw-away build stage to reduce size of final image
FROM base as build


# Install node modules
COPY package.json package-lock.json ./
RUN npm ci

# Copy application code
COPY . ./

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "run", "start" ]
