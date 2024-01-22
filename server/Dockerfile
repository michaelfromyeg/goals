# NOTE: untested!

# Stage 1: Build
# Use a base image that supports Bun
FROM ubuntu:latest as builder

WORKDIR /usr/src/app

# Install Bun
RUN apt-get update && \
    apt-get install -y curl unzip && \
    curl https://bun.sh/install | bash

# Set path for Bun
ENV PATH="/root/.bun/bin:${PATH}"

# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb* ./

# Install dependencies (including devDependencies)
RUN bun install

# Copy source code
COPY . .

# No build step is required as Bun natively understands TypeScript

# Stage 2: Runtime
# Use a smaller base image for the runtime
FROM ubuntu:latest

WORKDIR /usr/src/app

# Install Bun
RUN apt-get update && \
    apt-get install -y curl unzip && \
    curl https://bun.sh/install | bash

# Set path for Bun
ENV PATH="/root/.bun/bin:${PATH}"

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app .

# Install production dependencies
RUN bun install --production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "start"]
