#!/bin/sh

# Install various dependencies.

curl https://bun.sh/install | bash

cd goals
npm i

cd ../server
bun install
