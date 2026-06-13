#!/bin/bash

echo "🧹 Cleaning unused containers..."
docker container prune -f

echo "🧹 Cleaning unused images..."
docker image prune -f

echo "🧹 Cleaning unused volumes..."
docker volume prune -f

echo "🧹 Cleaning unused networks..."
docker network prune -f

echo "🧹 Cleaning build cache..."
docker builder prune -f

echo "✨ Docker cleanup complete!"
