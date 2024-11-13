#!/bin/bash

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "Please specify the launch environment (production or development)"
  echo "Example of use: ./start.sh production"
  exit 1
fi

DOCKERFILE="Dockerfile"
ENV_FILE=".env.production"

if [ "$ENVIRONMENT" == "development" ]; then
  DOCKERFILE="Dockerfile.dev"
  ENV_FILE=".env.development"
fi

echo "We are running the project in $ENVIRONMENT mode..."
echo "$DOCKERFILE and environment file $ENV_FILE are used"

export DOCKERFILE
export NODE_ENV=$ENVIRONMENT

docker-compose --env-file $ENV_FILE up --build
